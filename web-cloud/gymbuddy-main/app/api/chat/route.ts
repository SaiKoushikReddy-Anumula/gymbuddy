import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Chat API called")

    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("[v0] No authenticated user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] User authenticated:", user.id)

    const { message, conversationHistory } = await request.json()
    console.log("[v0] Message received:", message)

    // Get user's fitness context with error handling
    const [userProfileResult, recentWorkoutsResult, recentNutritionResult] = await Promise.all([
      supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .catch(() => ({ data: null, error: "No profile found" })),
      supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)
        .catch(() => ({ data: [], error: "No workouts found" })),
      supabase
        .from("daily_nutrition")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(7)
        .catch(() => ({ data: [], error: "No nutrition data found" })),
    ])

    console.log("[v0] User context loaded")

    const userContext = {
      profile: userProfileResult.data || { full_name: "User", fitness_level: "beginner", goals: ["general fitness"] },
      workouts: recentWorkoutsResult.data || [],
      nutrition: recentNutritionResult.data || [],
    }

    const contextPrompt = `You are GymBuddy AI, a professional fitness and nutrition coach assistant. You provide personalized, evidence-based advice to help users achieve their fitness goals.

User Context:
- Profile: ${JSON.stringify(userContext.profile)}
- Recent Workouts: ${JSON.stringify(userContext.workouts)}
- Recent Nutrition: ${JSON.stringify(userContext.nutrition)}

Conversation History:
${conversationHistory?.map((msg: any) => `${msg.role}: ${msg.content}`).join("\n") || ""}

User Message: ${message}

Guidelines:
- Provide personalized advice based on their data
- Be encouraging and motivational
- Give specific, actionable recommendations
- Reference their progress when relevant
- Keep responses concise but informative (max 200 words)
- If asked about medical issues, recommend consulting healthcare professionals
- Focus on fitness, nutrition, workout planning, and motivation
- If user data is limited, provide general helpful fitness advice

Respond as GymBuddy AI:`

    console.log("[v0] Calling Groq API...")

    let text
    try {
      const result = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        prompt: contextPrompt,
      })
      text = result.text
      console.log("[v0] Groq API response received")
    } catch (groqError) {
      console.error("[v0] Groq API error:", groqError)
      text = `Hi! I'm GymBuddy AI, your fitness coach. I'm having some technical difficulties right now, but I'm here to help with your fitness journey! 

Based on your question about "${message}", here are some general tips:
- Stay consistent with your workouts
- Focus on progressive overload
- Ensure adequate protein intake (0.8-1g per lb bodyweight)
- Get 7-9 hours of quality sleep
- Stay hydrated throughout the day

Please try asking me again in a moment, and I'll be able to give you more personalized advice based on your workout and nutrition data!`
    }

    // Save conversation to database
    try {
      await supabase.from("chat_messages").insert([
        {
          user_id: user.id,
          message: message,
          response: text,
          created_at: new Date().toISOString(),
        },
      ])
      console.log("[v0] Chat message saved to database")
    } catch (dbError) {
      console.error("[v0] Failed to save chat message:", dbError)
      // Continue anyway - don't fail the response if we can't save to DB
    }

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[v0] Chat error:", error)
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
        fallback: "I'm experiencing technical difficulties. Please try again in a moment!",
      },
      { status: 500 },
    )
  }
}
