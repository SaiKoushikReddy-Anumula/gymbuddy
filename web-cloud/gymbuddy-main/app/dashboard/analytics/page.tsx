"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Target, Calendar, Award } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface AnalyticsData {
  workoutProgress: any[]
  nutritionTrends: any[]
  macroDistribution: any[]
  weeklyStats: any
  monthlyComparison: any[]
  achievements: any[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    workoutProgress: [],
    nutritionTrends: [],
    macroDistribution: [],
    weeklyStats: {},
    monthlyComparison: [],
    achievements: [],
  })
  const [timeRange, setTimeRange] = useState("30")
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient()

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const daysAgo = Number.parseInt(timeRange)
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - daysAgo)

      // Load workout progress
      const { data: workouts } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: true })

      // Load nutrition trends
      const { data: nutrition } = await supabase
        .from("daily_nutrition")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", startDate.toISOString().split("T")[0])
        .order("date", { ascending: true })

      // Process workout progress data
      const workoutProgress = processWorkoutData(workouts || [])

      // Process nutrition trends
      const nutritionTrends = processNutritionData(nutrition || [])

      // Calculate macro distribution (last 7 days average)
      const macroDistribution = calculateMacroDistribution(nutrition || [])

      // Calculate weekly stats
      const weeklyStats = calculateWeeklyStats(workouts || [], nutrition || [])

      // Generate monthly comparison
      const monthlyComparison = generateMonthlyComparison(workouts || [], nutrition || [])

      // Generate achievements
      const achievements = generateAchievements(workouts || [], nutrition || [])

      setData({
        workoutProgress,
        nutritionTrends,
        macroDistribution,
        weeklyStats,
        monthlyComparison,
        achievements,
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const processWorkoutData = (workouts: any[]) => {
    const dailyWorkouts = workouts.reduce((acc, workout) => {
      const date = new Date(workout.created_at).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = { date, workouts: 0, totalDuration: 0, totalVolume: 0 }
      }
      acc[date].workouts += 1
      acc[date].totalDuration += workout.duration_minutes || 0
      acc[date].totalVolume += workout.total_volume || 0
      return acc
    }, {})

    return Object.values(dailyWorkouts)
  }

  const processNutritionData = (nutrition: any[]) => {
    return nutrition.map((day) => ({
      date: new Date(day.date).toLocaleDateString(),
      calories: day.total_calories || 0,
      protein: day.total_protein || 0,
      carbs: day.total_carbs || 0,
      fat: day.total_fat || 0,
      water: (day.water_intake_ml || 0) / 1000, // Convert to liters
    }))
  }

  const calculateMacroDistribution = (nutrition: any[]) => {
    const recent = nutrition.slice(-7) // Last 7 days
    const totals = recent.reduce(
      (acc, day) => ({
        protein: acc.protein + (day.total_protein || 0),
        carbs: acc.carbs + (day.total_carbs || 0),
        fat: acc.fat + (day.total_fat || 0),
      }),
      { protein: 0, carbs: 0, fat: 0 },
    )

    const total = totals.protein + totals.carbs + totals.fat
    if (total === 0) return []

    return [
      { name: "Protein", value: Math.round((totals.protein / total) * 100), color: "#10B981" },
      { name: "Carbs", value: Math.round((totals.carbs / total) * 100), color: "#3B82F6" },
      { name: "Fat", value: Math.round((totals.fat / total) * 100), color: "#F59E0B" },
    ]
  }

  const calculateWeeklyStats = (workouts: any[], nutrition: any[]) => {
    const thisWeek = {
      workouts: workouts.length,
      avgCalories: nutrition.reduce((sum, day) => sum + (day.total_calories || 0), 0) / Math.max(nutrition.length, 1),
      totalVolume: workouts.reduce((sum, workout) => sum + (workout.total_volume || 0), 0),
      avgWater: nutrition.reduce((sum, day) => sum + (day.water_intake_ml || 0), 0) / Math.max(nutrition.length, 1),
    }

    return thisWeek
  }

  const generateMonthlyComparison = (workouts: any[], nutrition: any[]) => {
    // Simplified monthly comparison - in real app would compare with previous periods
    return [
      { month: "This Month", workouts: workouts.length, avgCalories: 2100, avgProtein: 140 },
      { month: "Last Month", workouts: Math.max(0, workouts.length - 5), avgCalories: 2050, avgProtein: 135 },
    ]
  }

  const generateAchievements = (workouts: any[], nutrition: any[]) => {
    const achievements = []

    if (workouts.length >= 10) {
      achievements.push({ title: "Workout Warrior", description: "Completed 10+ workouts", icon: "🏋️" })
    }

    if (nutrition.length >= 7) {
      achievements.push({ title: "Nutrition Tracker", description: "Logged nutrition for 7+ days", icon: "🥗" })
    }

    const avgCalories =
      nutrition.reduce((sum, day) => sum + (day.total_calories || 0), 0) / Math.max(nutrition.length, 1)
    if (avgCalories >= 2000 && avgCalories <= 2500) {
      achievements.push({ title: "Balanced Eater", description: "Maintained healthy calorie range", icon: "⚖️" })
    }

    return achievements
  }

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"]

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
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Workouts</p>
                <p className="text-2xl font-bold text-white">{data.weeklyStats.workouts || 0}</p>
              </div>
              <Activity className="w-8 h-8 text-neon-green" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Daily Calories</p>
                <p className="text-2xl font-bold text-white">{Math.round(data.weeklyStats.avgCalories || 0)}</p>
              </div>
              <Target className="w-8 h-8 text-neon-blue" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">On target</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Volume</p>
                <p className="text-2xl font-bold text-white">{Math.round(data.weeklyStats.totalVolume || 0)} kg</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+8% strength gain</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Water Intake</p>
                <p className="text-2xl font-bold text-white">{((data.weeklyStats.avgWater || 0) / 1000).toFixed(1)}L</p>
              </div>
              <Calendar className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500">Need more hydration</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fitness" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="fitness">Fitness Progress</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="fitness" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workout Frequency */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Workout Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.workoutProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Bar dataKey="workouts" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Training Volume */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Training Volume Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.workoutProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalVolume"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calorie Trends */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Daily Calorie Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.nutritionTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Area type="monotone" dataKey="calories" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Macro Distribution */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Macro Distribution (7-day avg)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.macroDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.macroDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Macronutrient Trends */}
            <Card className="bg-gray-800/50 border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Macronutrient Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.nutritionTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="protein" stroke="#10B981" strokeWidth={2} name="Protein (g)" />
                    <Line type="monotone" dataKey="carbs" stroke="#3B82F6" strokeWidth={2} name="Carbs (g)" />
                    <Line type="monotone" dataKey="fat" stroke="#F59E0B" strokeWidth={2} name="Fat (g)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Comparison */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Monthly Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.monthlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="workouts" fill="#10B981" name="Workouts" />
                    <Bar dataKey="avgCalories" fill="#3B82F6" name="Avg Calories" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {data.achievements.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Keep tracking to unlock achievements!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-semibold text-white">{achievement.title}</h4>
                          <p className="text-sm text-gray-400">{achievement.description}</p>
                        </div>
                        <Badge className="ml-auto bg-neon-green/20 text-neon-green border-neon-green/30">New</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Water Intake Trend */}
            <Card className="bg-gray-800/50 border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Hydration Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={data.nutritionTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Area type="monotone" dataKey="water" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
