import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { goals, currentNutrition, userProfile } = await request.json()

    // Get user's recent nutrition data
    const { data: recentMeals } = await supabase
      .from("daily_nutrition")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(7)

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: `You are a professional nutritionist AI assistant for GymBuddy fitness app. 

      User Profile:
      - Goals: ${goals}
      - Current day nutrition: ${JSON.stringify(currentNutrition)}
      - User info: ${JSON.stringify(userProfile)}
      - Recent week nutrition: ${JSON.stringify(recentMeals)}

      Provide personalized nutrition advice including:
      1. Assessment of current intake vs goals
      2. Specific food recommendations for remaining meals
      3. Macro balance suggestions
      4. Hydration reminders
      5. Meal timing tips

      Keep advice practical, motivating, and specific to their fitness goals. Limit response to 200 words.`,
    })

    return NextResponse.json({ advice: text })
  } catch (error) {
    console.error("Nutrition advice error:", error)
    return NextResponse.json({ error: "Failed to generate advice" }, { status: 500 })
  }
}
