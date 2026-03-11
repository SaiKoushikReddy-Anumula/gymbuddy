"use client";

import type React from "react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dumbbell } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    weight: "",
    height: "",
    gender: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const calculateBMI = (weight: number, height: number) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const bmi = calculateBMI(
        Number(formData.weight),
        Number(formData.height),
      );
      console.log(process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL);

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.fullName,
            weight: formData.weight ? Number(formData.weight) : null,
            height: formData.height ? Number(formData.height) : null,
            gender: formData.gender || null,
            bmi: bmi,
          },
        },
      });
      if (error) throw error;
      router.push("/auth/signup-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-8 w-8 text-neon-green" />
            <h1 className="text-3xl font-bold text-white">GymBuddy</h1>
          </div>
          <p className="text-gray-400">Start your fitness journey today</p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-400">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-white">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-white">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white">
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-neon-green">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem
                      value="male"
                      className="text-white hover:bg-gray-700"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      value="female"
                      className="text-white hover:bg-gray-700"
                    >
                      Female
                    </SelectItem>
                    <SelectItem
                      value="other"
                      className="text-white hover:bg-gray-700"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-green"
                />
              </div>
              {formData.weight && formData.height && (
                <div className="text-sm text-gray-400">
                  BMI:{" "}
                  {calculateBMI(
                    Number(formData.weight),
                    Number(formData.height),
                  )}
                </div>
              )}
              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-800">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-neon-green hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
