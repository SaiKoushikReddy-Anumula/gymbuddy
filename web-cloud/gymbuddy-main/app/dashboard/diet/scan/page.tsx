"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AnalyzedFood {
  name: string
  estimatedGrams: number
  calories: number
  protein: number
  carbs: number
  fat: number
  confidence: number
}

interface FoodAnalysis {
  foods: AnalyzedFood[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  suggestions: string[]
}

export default function ScanFoodPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [description, setDescription] = useState("")
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFood = async () => {
    if (!imageFile && !description.trim()) {
      alert("Please upload an image or provide a description")
      return
    }

    setLoading(true)
    try {
      let imageUrl = ""

      if (imageFile) {
        // In a real app, you'd upload to a service like Vercel Blob
        // For now, we'll use the preview URL
        imageUrl = imagePreview
      }

      const response = await fetch("/api/analyze-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageUrl || null,
          description: description || null,
        }),
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setAnalysis(data)
    } catch (error) {
      console.error("Analysis error:", error)
      alert("Failed to analyze food. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const saveMeal = async () => {
    if (!analysis) return

    // Navigate to meal logging with pre-filled data
    const mealData = {
      foods: analysis.foods,
      totalNutrition: {
        calories: analysis.totalCalories,
        protein: analysis.totalProtein,
        carbs: analysis.totalCarbs,
        fat: analysis.totalFat,
      },
    }

    router.push(`/dashboard/diet/log?data=${encodeURIComponent(JSON.stringify(mealData))}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/diet">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diet
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">AI Food Scanner</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-neon-green">
              <Camera className="w-5 h-5 mr-2" />
              Scan Your Food
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image-upload" className="text-white">
                Upload Food Image
              </Label>
              <div className="mt-2">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Food preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
            </div>

            <div className="text-center text-gray-400">or</div>

            <div>
              <Label htmlFor="description" className="text-white">
                Describe Your Food
              </Label>
              <Textarea
                id="description"
                placeholder="e.g., Grilled chicken breast with rice and broccoli, medium portion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <Button
              onClick={analyzeFood}
              disabled={loading || (!imageFile && !description.trim())}
              className="w-full bg-neon-green hover:bg-neon-green/80 text-black"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Food
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!analysis ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Upload className="w-12 h-12 mb-4" />
                <p>Upload an image or describe your food to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Nutrition Summary */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-400">Total Calories</div>
                    <div className="text-xl font-bold text-white">{analysis.totalCalories}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Protein</div>
                    <div className="text-lg font-semibold text-neon-green">{analysis.totalProtein}g</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Carbs</div>
                    <div className="text-lg font-semibold text-neon-blue">{analysis.totalCarbs}g</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Fat</div>
                    <div className="text-lg font-semibold text-yellow-400">{analysis.totalFat}g</div>
                  </div>
                </div>

                {/* Identified Foods */}
                <div>
                  <h3 className="font-semibold text-white mb-2">Identified Foods</h3>
                  <div className="space-y-2">
                    {analysis.foods.map((food, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{food.name}</div>
                          <div className="text-sm text-gray-400">{food.estimatedGrams}g</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${
                              food.confidence > 0.8
                                ? "border-green-500 text-green-400"
                                : food.confidence > 0.6
                                  ? "border-yellow-500 text-yellow-400"
                                  : "border-red-500 text-red-400"
                            }`}
                          >
                            {Math.round(food.confidence * 100)}% confident
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">AI Suggestions</h3>
                    <div className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 bg-neon-green/10 border border-neon-green/20 rounded-lg">
                          <p className="text-sm text-gray-300">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={saveMeal} className="w-full bg-neon-blue hover:bg-neon-blue/80 text-white">
                  Save as Meal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
