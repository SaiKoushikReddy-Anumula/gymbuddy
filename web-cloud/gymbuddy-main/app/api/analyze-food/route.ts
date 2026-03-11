import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { groq } from "@ai-sdk/groq"
import { z } from "zod"

const nutritionSchema = z.object({
  foods: z.array(
    z.object({
      name: z.string(),
      estimatedGrams: z.number(),
      calories: z.number(),
      protein: z.number(),
      carbs: z.number(),
      fat: z.number(),
      confidence: z.number().min(0).max(1),
    }),
  ),
  totalCalories: z.number(),
  totalProtein: z.number(),
  totalCarbs: z.number(),
  totalFat: z.number(),
  suggestions: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, description } = await request.json()

    if (!imageUrl && !description) {
      return NextResponse.json({ error: "Image URL or description required" }, { status: 400 })
    }

    const prompt = imageUrl
      ? `Analyze this food image and provide detailed nutritional information. Identify all visible foods, estimate portion sizes in grams, and calculate nutrition values. Be as accurate as possible based on visual cues.

Image URL: ${imageUrl}`
      : `Analyze this food description: "${description}". Provide detailed nutritional information including estimated portion sizes and nutrition values based on common serving sizes.`

    console.log("[v0] Starting food analysis with Groq...")

    const { object } = await generateObject({
      model: groq("llama-3.1-70b-versatile"),
      schema: nutritionSchema,
      prompt: `${prompt}

You are a nutrition expert analyzing food for calorie and macro tracking. 

Return a JSON object with:
- foods: array of identified foods with realistic estimates
  - name: clear food name
  - estimatedGrams: realistic portion size
  - calories: calories for the estimated portion
  - protein: protein in grams for the estimated portion  
  - carbs: carbohydrates in grams for the estimated portion
  - fat: fat in grams for the estimated portion
  - confidence: how confident you are (0.0 to 1.0)
- totalCalories: sum of all food calories
- totalProtein: sum of all protein
- totalCarbs: sum of all carbs  
- totalFat: sum of all fat
- suggestions: 2-3 helpful tips for healthier alternatives or meal improvements

Be conservative with estimates and provide realistic nutrition values. If uncertain, indicate lower confidence scores.`,
    })

    console.log("[v0] Food analysis completed successfully")
    return NextResponse.json(object)
  } catch (error) {
    console.error("Food analysis error:", error)

    if (error instanceof Error && error.message.includes("API")) {
      return NextResponse.json(
        {
          error: "AI service temporarily unavailable",
          details: "Please try again in a moment",
          fallback: {
            foods: [
              {
                name: "Unknown Food",
                estimatedGrams: 100,
                calories: 200,
                protein: 10,
                carbs: 20,
                fat: 8,
                confidence: 0.3,
              },
            ],
            totalCalories: 200,
            totalProtein: 10,
            totalCarbs: 20,
            totalFat: 8,
            suggestions: ["Please try the analysis again", "Consider manual entry for now"],
          },
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to analyze food",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
