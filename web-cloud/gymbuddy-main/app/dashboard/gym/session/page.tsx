"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Play, Pause, Square, Timer, Zap, Target, RotateCcw } from "lucide-react"

export default function GymSessionPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [restTime, setRestTime] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)
  const [reps, setReps] = useState(0)
  const [workoutType, setWorkoutType] = useState("Push Day")
  const [stream, setStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const restIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (restIntervalRef.current) clearInterval(restIntervalRef.current)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      })

      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const startSession = () => {
    setIsRecording(true)
    startCamera()
    intervalRef.current = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)
  }

  const pauseSession = () => {
    setIsRecording(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const endSession = () => {
    setIsRecording(false)
    stopCamera()
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (restIntervalRef.current) clearInterval(restIntervalRef.current)

    // Reset all states
    setSessionTime(0)
    setRestTime(0)
    setIsResting(false)
    setCurrentSet(1)
    setReps(0)
  }

  const startRest = () => {
    setIsResting(true)
    setRestTime(90) // 90 seconds rest
    restIntervalRef.current = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          setIsResting(false)
          if (restIntervalRef.current) clearInterval(restIntervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const completeSet = () => {
    setCurrentSet((prev) => prev + 1)
    setReps((prev) => prev + 12) // Simulate completing 12 reps
    startRest()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Live Gym Session</h1>
        <p className="text-gray-400">AI-powered workout tracking with real-time form analysis</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Camera Feed */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Camera className="h-5 w-5" />
                Live Camera Feed
                {isRecording && <Badge className="bg-red-500 text-white animate-pulse">REC</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                {stream ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">Camera not active</p>
                      <Button onClick={startCamera} className="bg-neon-green text-black hover:bg-neon-green/90">
                        Enable Camera
                      </Button>
                    </div>
                  </div>
                )}

                {/* AI Analysis Overlay */}
                {stream && (
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                        <span className="text-neon-green text-sm font-medium">AI Analysis Active</span>
                      </div>
                      <p className="text-white text-sm">Form: Good | Rep Count: Auto-detecting | Posture: Aligned</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Controls */}
              <div className="flex justify-center gap-4 mt-4">
                {!isRecording ? (
                  <Button onClick={startSession} className="bg-neon-green text-black hover:bg-neon-green/90">
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseSession}
                      variant="outline"
                      className="border-gray-600 text-gray-300 bg-transparent"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button onClick={endSession} variant="destructive">
                      <Square className="h-4 w-4 mr-2" />
                      End Session
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Metrics */}
        <div className="space-y-6">
          {/* Session Timer */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Timer className="h-5 w-5" />
                Session Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-2">{formatTime(sessionTime)}</div>
                <p className="text-gray-400 text-sm">Total workout time</p>
              </div>
            </CardContent>
          </Card>

          {/* Rest Timer */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <RotateCcw className="h-5 w-5" />
                Rest Timer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${isResting ? "text-neon-blue" : "text-gray-500"}`}>
                  {formatTime(restTime)}
                </div>
                <p className="text-gray-400 text-sm mb-3">{isResting ? "Rest in progress" : "Ready for next set"}</p>
                {!isResting && isRecording && (
                  <Button onClick={startRest} size="sm" className="bg-neon-blue text-black hover:bg-neon-blue/90">
                    Start Rest (90s)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Current Workout */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-5 w-5" />
                Current Workout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge className="bg-neon-green text-black mb-2">{workoutType}</Badge>
                <p className="text-white font-medium">Bench Press</p>
                <p className="text-gray-400 text-sm">80kg × 8-10 reps</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Set Progress</span>
                  <span className="text-white">{currentSet}/4</span>
                </div>
                <Progress value={(currentSet / 4) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-neon-green">{reps}</div>
                  <p className="text-xs text-gray-400">Total Reps</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-blue">{currentSet - 1}</div>
                  <p className="text-xs text-gray-400">Sets Done</p>
                </div>
              </div>

              {isRecording && !isResting && (
                <Button onClick={completeSet} className="w-full bg-neon-green text-black hover:bg-neon-green/90">
                  <Target className="h-4 w-4 mr-2" />
                  Complete Set
                </Button>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                <p className="text-neon-green text-sm font-medium">✓ Good form detected</p>
                <p className="text-gray-400 text-xs">Maintain current technique</p>
              </div>
              <div className="p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                <p className="text-neon-blue text-sm font-medium">💡 Tip</p>
                <p className="text-gray-400 text-xs">Focus on controlled descent</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
