import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Apple, Calendar, Dumbbell, File as Fire, Target, TrendingUp, Trophy, Zap } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user?.id).single()

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          {greeting}, {profile?.full_name?.split(" ")[0] || "Champion"}! 💪
        </h1>
        <p className="text-gray-400">Ready to crush your fitness goals today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Today's Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-neon-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-gray-400">+1 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Calories Burned</CardTitle>
            <Fire className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">847</div>
            <p className="text-xs text-gray-400">Goal: 1000 cal</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Weekly Streak</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7</div>
            <p className="text-xs text-gray-400">Personal best!</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">AI Score</CardTitle>
            <Zap className="h-4 w-4 text-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">94</div>
            <p className="text-xs text-gray-400">Excellent form!</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-neon-green" />
                Today's Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Workout Sessions</span>
                  <span className="text-white">2/3</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Calories Burned</span>
                  <span className="text-white">847/1000</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Water Intake</span>
                  <span className="text-white">6/8 glasses</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-neon-blue" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-green/20 rounded-full flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-neon-green" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Upper Body Strength</p>
                      <p className="text-sm text-gray-400">45 minutes • 387 calories</p>
                    </div>
                  </div>
                  <Badge className="bg-neon-green/20 text-neon-green">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-blue/20 rounded-full flex items-center justify-center">
                      <Apple className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Meal Logged</p>
                      <p className="text-sm text-gray-400">Protein Bowl • 520 calories</p>
                    </div>
                  </div>
                  <Badge className="bg-neon-blue/20 text-neon-blue">Logged</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold" asChild>
                <a href="/dashboard/gym">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Start Workout
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10 bg-transparent"
                asChild
              >
                <a href="/dashboard/diet">
                  <Apple className="mr-2 h-4 w-4" />
                  Log Meal
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                asChild
              >
                <a href="/dashboard/chat">
                  <Zap className="mr-2 h-4 w-4" />
                  Ask AI Coach
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-neon-green" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Workouts</span>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Time</span>
                <span className="text-white font-semibold">8h 45m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Calories</span>
                <span className="text-white font-semibold">4,230</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">PR's Set</span>
                <span className="text-neon-green font-semibold">3</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-neon-blue" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-white font-medium">Leg Day</p>
                <p className="text-gray-400">Tomorrow, 6:00 PM</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">Nutrition Check-in</p>
                <p className="text-gray-400">Friday, 2:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
