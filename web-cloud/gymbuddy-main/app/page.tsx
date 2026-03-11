"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dumbbell,
  Brain,
  BarChart3,
  MessageCircle,
  Users,
  Target,
  Zap,
  Heart,
  Trophy,
  Star,
  ArrowRight,
  Play,
} from "lucide-react"

// Spline 3D Scene Component
function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js"
    document.body.appendChild(script)

    const splineEl = document.createElement("spline-viewer")
    splineEl.setAttribute(
      "url",
      "https://prod.spline.design/Hl74AJ2RYgohzxbb/scene.splinecode"
    )
    splineEl.style.width = "100%"
    splineEl.style.height = "100%"
    containerRef.current?.appendChild(splineEl)

    return () => {
      document.body.removeChild(script)
      containerRef.current?.removeChild(splineEl)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  )
}

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    { icon: <Brain className="h-8 w-8" />, title: "AI Reps Counter", description: "Smart computer vision tracks your reps and form automatically" },
    { icon: <Target className="h-8 w-8" />, title: "Diet Tracker", description: "AI-powered nutrition analysis from food photos and meal planning" },
    { icon: <BarChart3 className="h-8 w-8" />, title: "Advanced Analytics", description: "Comprehensive insights with heatmaps, progress charts, and performance metrics" },
    { icon: <MessageCircle className="h-8 w-8" />, title: "AI Chatbot", description: "Get personalized workout and nutrition advice powered by Gemini AI" },
    { icon: <Users className="h-8 w-8" />, title: "Community", description: "Connect with gym buddies, share progress, and stay motivated together" },
    { icon: <Zap className="h-8 w-8" />, title: "Smart Workouts", description: "Adaptive workout plans that evolve with your progress and goals" },
  ]

  const testimonials = [
    { name: "Alex Chen", role: "Fitness Enthusiast", content: "GymBuddy's AI form checker helped me perfect my deadlifts. My PRs have never been higher!", rating: 5, avatar: "/fitness-enthusiast-male.jpg" },
    { name: "Sarah Johnson", role: "Personal Trainer", content: "The analytics dashboard gives me incredible insights into my clients' progress. Game changer!", rating: 5, avatar: "/personal-trainer-female.jpg" },
    { name: "Mike Rodriguez", role: "Bodybuilder", content: "The diet tracking with AI analysis saves me hours. It's like having a nutritionist in my pocket.", rating: 5, avatar: "/bodybuilder-male.jpg" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-white">GymBuddy</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
              <a href="/auth/login">Log In</a>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="/auth/signup">Sign Up</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Elements */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                  <Zap className="h-4 w-4 mr-2" /> AI-Powered Fitness
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-balance">
                  Your Ultimate <span className="text-white"> AI Fitness </span> Companion
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Transform your fitness journey with AI-powered rep counting, smart diet tracking, and personalized insights. Join thousands achieving their goals with GymBuddy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group" asChild>
                  <a href="/auth/signup">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group bg-transparent"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">1M+</div>
                  <div className="text-sm text-muted-foreground">Workouts Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">App Rating</div>
                </div>
              </div>
            </div>

            {/* 3D Interactive Section */}
            <div className="relative">
              <div className="relative bg-card rounded-2xl p-8 border border-border">
                <SplineScene />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    <Heart className="h-4 w-4 mr-1 animate-pulse" /> Live 3D
                  </Badge>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">AI Tracking Active</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary">127</div>
                  <div className="text-xs text-muted-foreground">Reps Counted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">Features</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Everything You Need to
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"> Dominate </span>
              Your Fitness
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Powered by cutting-edge AI technology, GymBuddy provides comprehensive tools to track, analyze, and optimize every aspect of your fitness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-white border-primary/20">Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Loved by <span className="text-white"> Fitness Enthusiasts </span> Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:border-secondary/50 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-balance">
                  Ready to Transform Your
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Fitness Journey? </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Join thousands of users who've already revolutionized their workouts with AI-powered insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="/auth/signup">
                    <Trophy className="mr-2 h-5 w-5" /> Start Your Journey
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">GymBuddy</span>
              </div>
              <p className="text-muted-foreground">
                Your AI-powered fitness companion for smarter workouts and better results.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Community</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 GymBuddy. All rights reserved. Built with AI for the future of fitness.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
