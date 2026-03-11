import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const maxResults = searchParams.get("maxResults") || "12"

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // YouTube API key should be added to environment variables
    const API_KEY = process.env.YOUTUBE_API_KEY

    if (!API_KEY) {
      return NextResponse.json(
        {
          error: "YouTube API key not configured",
          videos: [], // Return empty array for demo purposes
        },
        { status: 500 },
      )
    }

    const searchQuery = `${query} fitness workout exercise`
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      console.error("YouTube API Error:", data)
      return NextResponse.json(
        {
          error: "Failed to fetch videos",
          videos: [],
        },
        { status: 500 },
      )
    }

    const videos =
      data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      })) || []

    return NextResponse.json({ videos })
  } catch (error) {
    console.error("YouTube search error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        videos: [],
      },
      { status: 500 },
    )
  }
}
