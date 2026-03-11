"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Play, User, Calendar } from "lucide-react"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  channelTitle: string
  publishedAt: string
  embedUrl: string
}

const popularInfluencers = [
  "Athlean-X",
  "Jeff Nippard",
  "Jeremy Ethier",
  "Calisthenic Movement",
  "FitnessBlender",
  "Yoga with Adriene",
  "Pamela Reif",
  "MadFit",
  "HIIT Workouts",
  "Pilates",
  "Strength Training",
  "Cardio Workouts",
]

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const searchVideos = async (query: string) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&maxResults=12`)
      const data = await response.json()

      if (data.videos) {
        setVideos(data.videos)
      } else {
        console.error("No videos found:", data.error)
        setVideos([])
      }
    } catch (error) {
      console.error("Error searching videos:", error)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchVideos(searchQuery)
  }

  const handleInfluencerClick = (influencer: string) => {
    setSearchQuery(influencer)
    searchVideos(influencer)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  useEffect(() => {
    // Load default fitness videos on page load
    searchVideos("fitness workout")
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Fitness Videos</h1>
        <p className="text-gray-400">Discover workout videos from top fitness influencers</p>
      </div>

      {/* Search */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for fitness influencers or workout types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          {/* Popular Influencers */}
          <div>
            <p className="text-sm text-gray-400 mb-3">Popular Fitness Influencers:</p>
            <div className="flex flex-wrap gap-2">
              {popularInfluencers.map((influencer) => (
                <Badge
                  key={influencer}
                  variant="secondary"
                  className="cursor-pointer hover:bg-neon-green hover:text-black transition-colors bg-gray-800 text-gray-300"
                  onClick={() => handleInfluencerClick(influencer)}
                >
                  {influencer}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white truncate">{selectedVideo.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
            <div className="aspect-video">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <User className="h-4 w-4" />
                <span>{selectedVideo.channelTitle}</span>
                <Calendar className="h-4 w-4 ml-4" />
                <span>{formatDate(selectedVideo.publishedAt)}</span>
              </div>
              <p className="text-gray-300 text-sm">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="bg-gray-900 border-gray-800 animate-pulse">
              <div className="aspect-video bg-gray-800 rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-800 rounded mb-2" />
                <div className="h-3 bg-gray-800 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="bg-gray-900 border-gray-800 hover:border-neon-green/50 transition-colors cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{truncateText(video.title, 60)}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <User className="h-3 w-3" />
                  <span className="truncate">{video.channelTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {videos.length === 0 && !loading && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No videos found</p>
              <p className="text-sm">Try searching for a different fitness influencer or workout type</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
