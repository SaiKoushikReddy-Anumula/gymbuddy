"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Trophy, Users, TrendingUp, Plus } from "lucide-react"

export default function CommunityPage() {
  const [posts] = useState([
    {
      id: 1,
      user: { name: "Sarah Johnson", avatar: "/personal-trainer-female.jpg", level: "Pro" },
      content:
        "Just hit a new PR on deadlifts! 140kg x 5 reps 💪 The key was focusing on form and progressive overload over the past 3 months.",
      image: "/gym-deadlift-celebration.jpg",
      likes: 24,
      comments: 8,
      time: "2 hours ago",
      tags: ["Strength", "PR", "Deadlift"],
    },
    {
      id: 2,
      user: { name: "Mike Wilson", avatar: "/bodybuilder-male.jpg", level: "Elite" },
      content:
        "Morning cardio session complete! 5K run in 22:30. The sunrise made it even better. Who else is starting their day with movement?",
      image: "/sunrise-running-track.jpg",
      likes: 18,
      comments: 12,
      time: "4 hours ago",
      tags: ["Cardio", "Running", "Morning"],
    },
    {
      id: 3,
      user: { name: "Alex Chen", avatar: "/fitness-enthusiast-male.jpg", level: "Intermediate" },
      content:
        "Week 8 of my transformation journey! Down 12kg and feeling stronger than ever. Consistency really is everything.",
      image: "/before-after-fitness-transformation.jpg",
      likes: 45,
      comments: 15,
      time: "6 hours ago",
      tags: ["Transformation", "Weight Loss", "Progress"],
    },
  ])

  const [challenges] = useState([
    {
      id: 1,
      title: "30-Day Push-Up Challenge",
      participants: 156,
      description: "Build upper body strength with daily push-up progressions",
      difficulty: "Beginner",
      daysLeft: 12,
      joined: true,
    },
    {
      id: 2,
      title: "February Cardio Challenge",
      participants: 89,
      description: "150 minutes of cardio per week for the entire month",
      difficulty: "Intermediate",
      daysLeft: 8,
      joined: false,
    },
    {
      id: 3,
      title: "Flexibility & Mobility",
      participants: 67,
      description: "Daily stretching and mobility work for better movement",
      difficulty: "All Levels",
      daysLeft: 20,
      joined: true,
    },
  ])

  const [leaderboard] = useState([
    { rank: 1, name: "Emma Rodriguez", points: 2450, badge: "🏆" },
    { rank: 2, name: "David Kim", points: 2380, badge: "🥈" },
    { rank: 3, name: "Lisa Thompson", points: 2290, badge: "🥉" },
    { rank: 4, name: "You", points: 2150, badge: "⭐" },
    { rank: 5, name: "James Wilson", points: 2080, badge: "💪" },
  ])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
        <p className="text-gray-400">Connect, share, and get motivated with fellow fitness enthusiasts</p>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="feed" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
            Feed
          </TabsTrigger>
          <TabsTrigger value="challenges" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-neon-green data-[state=active]:text-black">
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/fitness-enthusiast-male.jpg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder="Share your fitness journey..."
                    className="bg-gray-800 border-gray-700 text-white mb-3"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-neon-green text-black hover:bg-neon-green/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                      Add Photo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{post.user.name}</h3>
                        <Badge className="bg-neon-blue text-black text-xs">{post.user.level}</Badge>
                      </div>
                      <p className="text-sm text-gray-400">{post.time}</p>
                    </div>
                  </div>

                  <p className="text-white mb-4">{post.content}</p>

                  <div className="mb-4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-neon-green border-neon-green">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-neon-green">
                        <Heart className="h-4 w-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-neon-blue">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Active Challenges</h2>
              <p className="text-gray-400">Join challenges to stay motivated and compete with others</p>
            </div>
            <Button className="bg-neon-green text-black hover:bg-neon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={challenge.joined ? "bg-neon-green text-black" : "bg-gray-700 text-white"}>
                      {challenge.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Users className="h-4 w-4" />
                      {challenge.participants}
                    </div>
                  </div>
                  <CardTitle className="text-white">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Days remaining</span>
                      <span className="text-lg font-semibold text-neon-green">{challenge.daysLeft}</span>
                    </div>

                    <Button
                      className={
                        challenge.joined
                          ? "w-full bg-gray-700 text-white hover:bg-gray-600"
                          : "w-full bg-neon-green text-black hover:bg-neon-green/90"
                      }
                    >
                      {challenge.joined ? "Joined" : "Join Challenge"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trophy className="h-6 w-6 text-neon-green" />
                Monthly Leaderboard
              </CardTitle>
              <CardDescription>Top performers based on workout consistency and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      user.name === "You" ? "bg-neon-green/10 border border-neon-green/30" : "bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{user.badge}</div>
                      <div>
                        <p className={`font-semibold ${user.name === "You" ? "text-neon-green" : "text-white"}`}>
                          #{user.rank} {user.name}
                        </p>
                        <p className="text-sm text-gray-400">{user.points} points</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-neon-green" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
