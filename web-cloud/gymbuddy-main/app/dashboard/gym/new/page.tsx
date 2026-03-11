"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Plus, Search, Target, ArrowLeft } from "lucide-react"

interface Exercise {
  id: string
  name: string
  category: string
  muscle_groups: string[]
  equipment: string
  instructions: string
}

export default function NewWorkoutPage() {
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDescription, setWorkoutDescription] = useState("")
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showExercises, setShowExercises] = useState(false)
  const router = useRouter()

  const loadExercises = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("exercises").select("*").order("name")

    if (data) {
      setAvailableExercises(data)
    }
  }

  const handleShowExercises = () => {
    if (!showExercises) {
      loadExercises()
    }
    setShowExercises(!showExercises)
  }

  const addExercise = (exercise: Exercise) => {
    if (!selectedExercises.find((e) => e.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise])
    }
  }

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter((e) => e.id !== exerciseId))
  }

  const createWorkout = async () => {
    if (!workoutName.trim()) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      // Create workout
      const { data: workout, error: workoutError } = await supabase
        .from("workouts")
        .insert({
          name: workoutName,
          description: workoutDescription,
          status: "active",
        })
        .select()
        .single()

      if (workoutError) throw workoutError

      // Add exercises to workout
      if (selectedExercises.length > 0) {
        const workoutExercises = selectedExercises.map((exercise, index) => ({
          workout_id: workout.id,
          exercise_id: exercise.id,
          order_index: index + 1,
          target_sets: 3,
          target_reps: 10,
        }))

        const { error: exerciseError } = await supabase.from("workout_exercises").insert(workoutExercises)

        if (exerciseError) throw exerciseError
      }

      router.push(`/dashboard/gym/workout/${workout.id}`)
    } catch (error) {
      console.error("Error creating workout:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredExercises = availableExercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscle_groups.some((muscle) => muscle.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      chest: "bg-red-500/20 text-red-400",
      back: "bg-blue-500/20 text-blue-400",
      legs: "bg-green-500/20 text-green-400",
      shoulders: "bg-yellow-500/20 text-yellow-400",
      arms: "bg-purple-500/20 text-purple-400",
      core: "bg-orange-500/20 text-orange-400",
      cardio: "bg-pink-500/20 text-pink-400",
    }
    return colors[category] || "bg-gray-500/20 text-gray-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
          <a href="/dashboard/gym">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gym
          </a>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">New Workout</h1>
          <p className="text-gray-400">Create a custom workout session</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Details */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-neon-green" />
              Workout Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Workout Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Upper Body Strength"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Workout notes or goals..."
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                rows={3}
              />
            </div>

            {/* Selected Exercises */}
            <div className="space-y-2">
              <Label className="text-white">Selected Exercises ({selectedExercises.length})</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                    <div>
                      <p className="text-white text-sm font-medium">{exercise.name}</p>
                      <p className="text-gray-400 text-xs">{exercise.muscle_groups.join(", ")}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {selectedExercises.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No exercises selected</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={createWorkout}
                disabled={!workoutName.trim() || isLoading}
                className="flex-1 bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
              >
                {isLoading ? "Creating..." : "Start Workout"}
              </Button>
              <Button
                onClick={handleShowExercises}
                variant="outline"
                className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Exercises
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Library */}
        {showExercises && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-neon-blue" />
                Exercise Library
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredExercises.map((exercise) => (
                  <div key={exercise.id} className="p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{exercise.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getCategoryColor(exercise.category)}>{exercise.category}</Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-400">
                            {exercise.equipment}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{exercise.muscle_groups.join(", ")}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addExercise(exercise)}
                        disabled={selectedExercises.some((e) => e.id === exercise.id)}
                        className="bg-neon-green hover:bg-neon-green/80 text-black"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
