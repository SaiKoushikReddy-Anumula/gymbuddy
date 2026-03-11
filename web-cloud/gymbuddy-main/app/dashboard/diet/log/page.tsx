"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"

interface FoodItem {
  id?: string
  name: string
  quantity: number
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function LogMealPage() {
  const [mealName, setMealName] = useState("")
  const [mealType, setMealType] = useState("")
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createBrowserClient()

  useEffect(() => {
    // Check if we have pre-filled data from AI scan
    const dataParam = searchParams.get("data")
    if (dataParam) {
      try {
        const scanData = JSON.parse(decodeURIComponent(dataParam))
        const mappedFoods = scanData.foods.map((food: any) => ({
          name: food.name,
          quantity: food.estimatedGrams,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
        }))
        setFoods(mappedFoods)
        setMealName("AI Scanned Meal")
      } catch (error) {
        console.error("Error parsing scan data:", error)
      }
    }
  }, [searchParams])

  const addFoodItem = () => {
    setFoods([
      ...foods,
      {
        name: "",
        quantity: 0,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    ])
  }

  const updateFoodItem = (index: number, field: keyof FoodItem, value: string | number) => {
    const updatedFoods = [...foods]
    updatedFoods[index] = { ...updatedFoods[index], [field]: value }
    setFoods(updatedFoods)
  }

  const removeFoodItem = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index))
  }

  const calculateTotals = () => {
    return foods.reduce(
      (totals, food) => ({
        calories: totals.calories + (food.calories || 0),
        protein: totals.protein + (food.protein || 0),
        carbs: totals.carbs + (food.carbs || 0),
        fat: totals.fat + (food.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )
  }

  const saveMeal = async () => {
    if (!mealName.trim() || !mealType || foods.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const totals = calculateTotals()
      const today = new Date().toISOString().split("T")[0]

      // Create meal
      const { data: meal, error: mealError } = await supabase
        .from("meals")
        .insert({
          user_id: user.id,
          name: mealName,
          meal_type: mealType,
          date: today,
          total_calories: totals.calories,
          total_protein: totals.protein,
          total_carbs: totals.carbs,
          total_fat: totals.fat,
          notes: notes || null,
        })
        .select()
        .single()

      if (mealError) throw mealError

      // Add foods to meal (simplified - in real app you'd match against foods table)
      const mealFoods = foods.map((food) => ({
        meal_id: meal.id,
        food_id: null, // Would be actual food ID from foods table
        quantity_grams: food.quantity,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      }))

      // Update daily nutrition
      const { data: existingNutrition } = await supabase
        .from("daily_nutrition")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()

      const newTotals = {
        total_calories: (existingNutrition?.total_calories || 0) + totals.calories,
        total_protein: (existingNutrition?.total_protein || 0) + totals.protein,
        total_carbs: (existingNutrition?.total_carbs || 0) + totals.carbs,
        total_fat: (existingNutrition?.total_fat || 0) + totals.fat,
        water_intake_ml: existingNutrition?.water_intake_ml || 0,
      }

      await supabase.from("daily_nutrition").upsert({
        user_id: user.id,
        date: today,
        ...newTotals,
      })

      router.push("/dashboard/diet")
    } catch (error) {
      console.error("Error saving meal:", error)
      alert("Failed to save meal. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const totals = calculateTotals()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/diet">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diet
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Log Meal</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meal Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Meal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meal-name" className="text-white">
                  Meal Name
                </Label>
                <Input
                  id="meal-name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="e.g., Breakfast, Post-workout meal"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="meal-type" className="text-white">
                  Meal Type
                </Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes" className="text-white">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes about this meal..."
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Food Items */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Food Items</CardTitle>
                <Button onClick={addFoodItem} size="sm" className="bg-neon-green hover:bg-neon-green/80 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Food
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {foods.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No food items added yet</p>
                  <p className="text-sm">Click "Add Food" to start logging your meal</p>
                </div>
              ) : (
                foods.map((food, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">Food Item {index + 1}</h4>
                      <Button
                        onClick={() => removeFoodItem(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-300">Food Name</Label>
                        <Input
                          value={food.name}
                          onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                          placeholder="e.g., Chicken breast"
                          className="mt-1 bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Quantity (grams)</Label>
                        <Input
                          type="number"
                          value={food.quantity}
                          onChange={(e) => updateFoodItem(index, "quantity", Number.parseFloat(e.target.value) || 0)}
                          placeholder="100"
                          className="mt-1 bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-gray-300">Calories</Label>
                        <Input
                          type="number"
                          value={food.calories}
                          onChange={(e) => updateFoodItem(index, "calories", Number.parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="mt-1 bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Protein (g)</Label>
                        <Input
                          type="number"
                          value={food.protein}
                          onChange={(e) => updateFoodItem(index, "protein", Number.parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="mt-1 bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Carbs (g)</Label>
                        <Input
                          type="number"
                          value={food.carbs}
                          onChange={(e) => updateFoodItem(index, "carbs", Number.parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="mt-1 bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Fat (g)</Label>
                        <Input
                          type="number"
                          value={food.fat}
                          onChange={(e) => updateFoodItem(index, "fat", Number.parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="mt-1 bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Summary */}
        <div>
          <Card className="bg-gray-800/50 border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Nutrition Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{totals.calories}</div>
                  <div className="text-sm text-gray-400">Calories</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-neon-green">{totals.protein}g</div>
                  <div className="text-sm text-gray-400">Protein</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-neon-blue">{totals.carbs}g</div>
                  <div className="text-sm text-gray-400">Carbs</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{totals.fat}g</div>
                  <div className="text-sm text-gray-400">Fat</div>
                </div>
              </div>

              <Button
                onClick={saveMeal}
                disabled={loading || !mealName.trim() || !mealType || foods.length === 0}
                className="w-full bg-neon-green hover:bg-neon-green/80 text-black"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Meal"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
