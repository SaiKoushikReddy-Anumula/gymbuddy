"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Camera, Utensils, Target, Droplets, TrendingUp } from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"

interface DailyNutrition {
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  water_intake_ml: number
}

interface Meal {
  id: string
  name: string
  meal_type: string
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  created_at: string
}

export default function DietPage() {
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    water_intake_ml: 0,
  })
  const [meals, setMeals] = useState<Meal[]>([])
  const [aiAdvice, setAiAdvice] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient()

  // Daily goals (these could come from user profile)
  const goals = {
    calories: 2200,
    protein: 150,
    carbs: 250,
    fat: 80,
    water: 3000,
  }

  useEffect(() => {
    loadDailyData()
    getAIAdvice()
  }, [])

  const loadDailyData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const today = new Date().toISOString().split("T")[0]

      // Load daily nutrition
      const { data: nutrition } = await supabase
        .from("daily_nutrition")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()

      if (nutrition) {
        setDailyNutrition(nutrition)
      }

      // Load today's meals
      const { data: mealsData } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .order("created_at", { ascending: false })

      if (mealsData) {
        setMeals(mealsData)
      }
    } catch (error) {
      console.error("Error loading daily data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAIAdvice = async () => {
    try {
      const response = await fetch("/api/nutrition-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goals,
          currentNutrition: dailyNutrition,
          userProfile: { goals: "muscle gain" },
        }),
      })

      const data = await response.json()
      if (data.advice) {
        setAiAdvice(data.advice)
      }
    } catch (error) {
      console.error("Error getting AI advice:", error)
    }
  }

  const addWater = async (amount: number) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const newWaterIntake = dailyNutrition.water_intake_ml + amount
      const today = new Date().toISOString().split("T")[0]

      await supabase.from("daily_nutrition").upsert({
        user_id: user.id,
        date: today,
        water_intake_ml: newWaterIntake,
        total_calories: dailyNutrition.total_calories,
        total_protein: dailyNutrition.total_protein,
        total_carbs: dailyNutrition.total_carbs,
        total_fat: dailyNutrition.total_fat,
      })

      setDailyNutrition((prev) => ({ ...prev, water_intake_ml: newWaterIntake }))
    } catch (error) {
      console.error("Error updating water intake:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-green"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Diet Tracking</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/diet/log">
            <Button className="bg-neon-green hover:bg-neon-green/80 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Log Meal
            </Button>
          </Link>
          <Link href="/dashboard/diet/scan">
            <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              Scan Food
            </Button>
          </Link>
        </div>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">
              {dailyNutrition.total_calories} / {goals.calories}
            </div>
            <Progress value={(dailyNutrition.total_calories / goals.calories) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-green mb-2">
              {dailyNutrition.total_protein}g / {goals.protein}g
            </div>
            <Progress value={(dailyNutrition.total_protein / goals.protein) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Carbs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-blue mb-2">
              {dailyNutrition.total_carbs}g / {goals.carbs}g
            </div>
            <Progress value={(dailyNutrition.total_carbs / goals.carbs) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Droplets className="w-4 h-4 mr-2" />
              Water
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400 mb-2">
              {(dailyNutrition.water_intake_ml / 1000).toFixed(1)}L / {goals.water / 1000}L
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => addWater(250)} className="text-xs">
                +250ml
              </Button>
              <Button size="sm" variant="outline" onClick={() => addWater(500)} className="text-xs">
                +500ml
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="meals" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="meals">Today's Meals</TabsTrigger>
          <TabsTrigger value="ai-advice">AI Nutrition Coach</TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="space-y-4">
          {meals.length === 0 ? (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Utensils className="w-12 h-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No meals logged today</h3>
                <p className="text-gray-400 text-center mb-4">
                  Start tracking your nutrition by logging your first meal
                </p>
                <Link href="/dashboard/diet/log">
                  <Button className="bg-neon-green hover:bg-neon-green/80 text-black">Log Your First Meal</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {meals.map((meal) => (
                <Card key={meal.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white">{meal.name}</h3>
                        <Badge variant="outline" className="capitalize">
                          {meal.meal_type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">{new Date(meal.created_at).toLocaleTimeString()}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Calories:</span>
                        <div className="font-semibold text-white">{meal.total_calories}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Protein:</span>
                        <div className="font-semibold text-neon-green">{meal.total_protein}g</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Carbs:</span>
                        <div className="font-semibold text-neon-blue">{meal.total_carbs}g</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Fat:</span>
                        <div className="font-semibold text-yellow-400">{meal.total_fat}g</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ai-advice">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-green">
                <TrendingUp className="w-5 h-5 mr-2" />
                AI Nutrition Coach
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiAdvice ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">{aiAdvice}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-neon-green"></div>
                  <span className="ml-2 text-gray-400">Getting personalized advice...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
