"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Scale, Calendar, Target, Bell, Shield } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  full_name: string
  weight: number
  height: number
  gender: string
  bmi: number
  created_at: string
  updated_at: string
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    weight: "",
    height: "",
    gender: "",
  })

  const supabase = createBrowserClient()
  const router = useRouter()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: profile, error } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
        return
      }

      if (profile) {
        setProfile(profile)
        setFormData({
          full_name: profile.full_name || "",
          weight: profile.weight?.toString() || "",
          height: profile.height?.toString() || "",
          gender: profile.gender || "",
        })
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const weight = Number.parseFloat(formData.weight)
      const height = Number.parseFloat(formData.height)
      const bmi = weight && height ? weight / (height / 100) ** 2 : null

      const updateData = {
        full_name: formData.full_name,
        weight: weight || null,
        height: height || null,
        gender: formData.gender || null,
        bmi: bmi,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("user_profiles").upsert({ id: user.id, ...updateData })

      if (error) throw error

      await fetchUserProfile()
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error updating profile")
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-green"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Information */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information and fitness metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="gender" className="text-white">
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight" className="text-white">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter weight in kg"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-white">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter height in cm"
                />
              </div>
            </div>

            {profile && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-gray-800 rounded-lg">
                <div className="text-center">
                  <Scale className="h-6 w-6 text-neon-green mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Current BMI</p>
                  <p className="text-lg font-semibold text-white">{profile.bmi ? profile.bmi.toFixed(1) : "N/A"}</p>
                </div>
                <div className="text-center">
                  <Calendar className="h-6 w-6 text-neon-blue mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <Target className="h-6 w-6 text-neon-green mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Profile Status</p>
                  <Badge className="bg-neon-green text-black">Active</Badge>
                </div>
              </div>
            )}

            <Button onClick={handleSave} disabled={saving} className="bg-neon-green text-black hover:bg-neon-green/90">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Workout Reminders</p>
                <p className="text-sm text-gray-400">Get notified about scheduled workouts</p>
              </div>
              <Badge variant="outline" className="text-neon-green border-neon-green">
                Enabled
              </Badge>
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Nutrition Tracking</p>
                <p className="text-sm text-gray-400">Daily meal logging reminders</p>
              </div>
              <Badge variant="outline" className="text-neon-blue border-neon-blue">
                Enabled
              </Badge>
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Progress Updates</p>
                <p className="text-sm text-gray-400">Weekly progress summaries</p>
              </div>
              <Badge variant="outline" className="text-gray-400 border-gray-400">
                Disabled
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your account security and data privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                Enable
              </Button>
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Data Export</p>
                <p className="text-sm text-gray-400">Download your fitness data</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                Export
              </Button>
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Delete Account</p>
                <p className="text-sm text-gray-400">Permanently delete your account</p>
              </div>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
