import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Play, Square, Clock, Flame, Target, Plus, History, TrendingUp } from "lucide-react"

export default async function GymPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get active workout
  const { data: activeWorkout } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user?.id)
    .eq("status", "active")
    .single()

  // Get recent workouts
  const { data: recentWorkouts } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user?.id)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .limit(5)

  // Get workout stats
  const { data: workoutStats } = await supabase
    .from("workouts")
    .select("duration_minutes, calories_burned")
    .eq("user_id", user?.id)
    .eq("status", "completed")

  const totalWorkouts = recentWorkouts?.length || 0
  const totalMinutes = workoutStats?.reduce((sum, w) => sum + (w.duration_minutes || 0), 0) || 0
  const totalCalories = workoutStats?.reduce((sum, w) => sum + (w.calories_burned || 0), 0) || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gym Sessions</h1>
          <p className="text-gray-400">Track your workouts and crush your goals</p>
        </div>
        <Button className="bg-neon-green hover:bg-neon-green/80 text-black font-semibold" asChild>
          <a href="/dashboard/gym/new">
            <Plus className="mr-2 h-4 w-4" />
            New Workout
          </a>
        </Button>
      </div>

      {/* Active Workout */}
      {activeWorkout && (
        <Card className="bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border-neon-green/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Play className="h-5 w-5 text-neon-green" />
              Active Workout: {activeWorkout.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">
                  {Math.floor((Date.now() - new Date(activeWorkout.started_at).getTime()) / 60000)}m
                </div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">0</div>
                <div className="text-sm text-gray-400">Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">0</div>
                <div className="text-sm text-gray-400">Calories</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-neon-green hover:bg-neon-green/80 text-black" asChild>
                <a href={`/dashboard/gym/workout/${activeWorkout.id}`}>Continue Workout</a>
              </Button>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent">
                <Square className="mr-2 h-4 w-4" />
                End
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-neon-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalWorkouts}</div>
            <p className="text-xs text-gray-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </div>
            <p className="text-xs text-gray-400">Training time</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Calories Burned</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalCalories.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Total burned</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workouts */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <History className="h-5 w-5 text-neon-blue" />
            Recent Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentWorkouts && recentWorkouts.length > 0 ? (
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center">
                      <Dumbbell className="h-6 w-6 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{workout.name}</h3>
                      <p className="text-sm text-gray-400">
                        {workout.duration_minutes}min • {workout.calories_burned || 0} calories
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-neon-green/20 text-neon-green">Completed</Badge>
                    <p className="text-xs text-gray-400 mt-1">{new Date(workout.completed_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Dumbbell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No workouts yet. Start your first session!</p>
              <Button className="mt-4 bg-neon-green hover:bg-neon-green/80 text-black" asChild>
                <a href="/dashboard/gym/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Workout
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Workout Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              asChild
            >
              <a href="/dashboard/gym/templates/push">
                <Target className="mr-2 h-4 w-4" />
                Push Day (Chest, Shoulders, Triceps)
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              asChild
            >
              <a href="/dashboard/gym/templates/pull">
                <Target className="mr-2 h-4 w-4" />
                Pull Day (Back, Biceps)
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              asChild
            >
              <a href="/dashboard/gym/templates/legs">
                <Target className="mr-2 h-4 w-4" />
                Leg Day (Quads, Hamstrings, Glutes)
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-neon-green" />
              Progress Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Weekly Workouts</span>
                <span className="text-white">3/5</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Monthly Goal</span>
                <span className="text-white">12/20</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
