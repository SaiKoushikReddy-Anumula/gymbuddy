"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dumbbell,
  Home,
  Activity,
  Apple,
  BarChart3,
  MessageCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Target,
  Calendar,
  Play,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface SidebarProps {
  currentPath?: string
}

export function DashboardSidebar({ currentPath = "/dashboard" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", badge: null },
    { icon: Activity, label: "Gym Sessions", href: "/dashboard/gym", badge: "3" },
    { icon: Apple, label: "Diet Tracker", href: "/dashboard/diet", badge: null },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", badge: null },
    { icon: MessageCircle, label: "AI Coach", href: "/dashboard/chat", badge: "New" },
    { icon: Play, label: "Videos", href: "/dashboard/videos", badge: "YouTube" }, // Added Videos navigation item
    { icon: Users, label: "Community", href: "/dashboard/community", badge: null },
    { icon: Target, label: "Goals", href: "/dashboard/goals", badge: null },
    { icon: Calendar, label: "Live Session", href: "/dashboard/gym/session", badge: "AI" },
  ]

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 bg-gray-900/50 border-r border-gray-700 flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-neon-green" />
              <span className="text-xl font-bold text-white">GymBuddy</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = currentPath === item.href
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start text-left ${
                isActive
                  ? "bg-neon-green/20 text-neon-green border-neon-green/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              } ${isCollapsed ? "px-2" : "px-3"}`}
              asChild
            >
              <a href={item.href}>
                <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-neon-blue/20 text-neon-blue text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </a>
            </Button>
          )
        })}
      </nav>

      <Separator className="bg-gray-700" />

      {/* Bottom Section */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 ${isCollapsed ? "px-2" : "px-3"}`}
          asChild
        >
          <a href="/dashboard/settings">
            <Settings className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
            {!isCollapsed && "Settings"}
          </a>
        </Button>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={`w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-900/20 ${isCollapsed ? "px-2" : "px-3"}`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )
}
