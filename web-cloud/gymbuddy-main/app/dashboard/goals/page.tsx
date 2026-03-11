"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Trophy, Calendar, Plus, TrendingUp, Zap, Dumbbell, Apple } from "lucide-react"

export default function GoalsPage() {
  const [activeGoals] = useState([
    {
      id: 1,
      title: "Lose 10kg",
      category: "Weight Loss",
      target: 10,
      current: 3.5,
      unit: "kg",
      deadline: "2024-06-01",
      progress: 35,
      icon: TrendingUp,
      color: "neon-green",
    },
    {
      id: 2,
      title: "Bench Press 100kg",
      category: "Strength",
      target: 100,
      current: 80,
      unit: "kg",
      deadline: "2024-04-15",
      progress: 80,
      icon: Dumbbell,
      color: "neon-blue",
    },
    {
      id: 3,
      title: "Run 5K in 25 minutes",
      category: "Cardio",
      target: 25,
      current: 28,
      unit: "min",
      deadline: "2024-03-30",
      progress: 70,
      icon: Zap,
      color: "neon-green",
    },
  ])

  const [completedGoals] = useState([
    {
      id: 4,
      title: "Workout 3x per week",
      category: "Consistency",
      completedDate: "2024-01-15",
      icon: Trophy,
      color: "neon-blue",
    },
    {
      id: 5,
      title: "Track meals for 30 days",
      category: "Nutrition",
      completedDate: "2024-01-10",
      icon: Apple,
      color: "neon-green",
    },
  ])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Fitness Goals</h1>
        <p className="text-gray-400">Track your progress and achieve your fitness milestones</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="active" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
            Active Goals
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
            Completed
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
            Create New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeGoals.map((goal) => {
              const Icon = goal.icon
              return (
                <Card key={goal.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className={`h-6 w-6 text-${goal.color}`} />
                      <Badge variant="outline" className={`text-${goal.color} border-${goal.color}`}>
                        {goal.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-lg">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {goal.current}
                          <span className="text-sm text-gray-400 ml-1">
                            / {goal.target} {goal.unit}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>

                    <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                      Update Progress
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center">
                <Target className="h-12 w-12 text-neon-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ready for a new challenge?</h3>
                <p className="text-gray-400 mb-4">Set a new goal to keep pushing your limits</p>
                <Button className="bg-neon-green text-black hover:bg-neon-green/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-4">
            {completedGoals.map((goal) => {
              const Icon = goal.icon
              return (
                <Card key={goal.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-${goal.color}/20`}>
                        <Icon className={`h-6 w-6 text-${goal.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                        <p className="text-gray-400">{goal.category}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-neon-green text-black">Completed</Badge>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(goal.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Create New Goal</CardTitle>
              <CardDescription>Set a new fitness goal to track your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-title" className="text-white">
                    Goal Title
                  </Label>
                  <Input
                    id="goal-title"
                    placeholder="e.g., Run 10K without stopping"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-category" className="text-white">
                    Category
                  </Label>
                  <Input
                    id="goal-category"
                    placeholder="e.g., Cardio, Strength, Weight Loss"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-target" className="text-white">
                    Target Value
                  </Label>
                  <Input
                    id="goal-target"
                    type="number"
                    placeholder="e.g., 10"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-unit" className="text-white">
                    Unit
                  </Label>
                  <Input
                    id="goal-unit"
                    placeholder="e.g., kg, minutes, reps"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-deadline" className="text-white">
                    Target Date
                  </Label>
                  <Input id="goal-deadline" type="date" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="goal-current" className="text-white">
                    Current Value
                  </Label>
                  <Input
                    id="goal-current"
                    type="number"
                    placeholder="e.g., 5"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-neon-green text-black hover:bg-neon-green/90">Create Goal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
