"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, MessageCircle, Trash2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface ChatMessage {
  id: string
  message: string
  response: string
  created_at: string
}

interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient()

  useEffect(() => {
    loadChatHistory()
    // Add welcome message
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your GymBuddy AI coach. I'm here to help you with fitness advice, workout planning, nutrition guidance, and motivation. I can see your progress and provide personalized recommendations. What would you like to know?",
        timestamp: new Date().toISOString(),
      },
    ])
  }, [])

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const loadChatHistory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: history } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10)

      if (history) {
        setChatHistory(history.reverse())
      }
    } catch (error) {
      console.error("Error loading chat history:", error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setLoading(true)

    // Add user message to conversation
    const newUserMessage: ConversationMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Add AI response to conversation
      const aiMessage: ConversationMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])
      loadChatHistory() // Refresh history
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ConversationMessage = {
        role: "assistant",
        content: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your GymBuddy AI coach. I'm here to help you with fitness advice, workout planning, nutrition guidance, and motivation. What would you like to know?",
        timestamp: new Date().toISOString(),
      },
    ])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestedQuestions = [
    "What should I eat after my workout?",
    "How can I improve my bench press?",
    "Create a weekly workout plan for me",
    "Am I eating enough protein?",
    "How to stay motivated?",
  ]

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white">AI Fitness Coach</h1>
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by AI
          </Badge>
        </div>
        <Button
          onClick={clearChat}
          variant="outline"
          size="sm"
          className="text-gray-400 hover:text-white bg-transparent"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chat Interface */}
        <Card className="lg:col-span-3 bg-gray-800/50 border-gray-700 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with GymBuddy AI
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-neon-green" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-neon-blue text-white ml-auto"
                          : "bg-gray-700/50 text-gray-100 border border-gray-600"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">{new Date(message.timestamp).toLocaleTimeString()}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-neon-blue" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-neon-green" />
                    </div>
                    <div className="bg-gray-700/50 text-gray-100 border border-gray-600 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neon-green"></div>
                        <span className="text-sm">GymBuddy AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-gray-700 p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fitness, nutrition, or workouts..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                  disabled={loading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || loading}
                  className="bg-neon-green hover:bg-neon-green/80 text-black"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Suggested Questions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputMessage(question)}
                  className="w-full text-left justify-start text-xs text-gray-300 hover:text-white hover:bg-gray-700/50 h-auto p-2"
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              {chatHistory.length === 0 ? (
                <p className="text-xs text-gray-400">No previous conversations</p>
              ) : (
                <div className="space-y-2">
                  {chatHistory.slice(0, 5).map((chat) => (
                    <div key={chat.id} className="p-2 bg-gray-700/30 rounded text-xs">
                      <p className="text-gray-300 truncate">{chat.message}</p>
                      <p className="text-gray-500 text-xs mt-1">{new Date(chat.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                <span>Personalized advice</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                <span>Progress analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Workout planning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Nutrition guidance</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
