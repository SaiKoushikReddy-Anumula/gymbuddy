import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Mail } from "lucide-react"
import Link from "next/link"

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="h-8 w-8 text-neon-green" />
            <h1 className="text-3xl font-bold text-white">GymBuddy</h1>
          </div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-neon-green" />
            </div>
            <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
            <CardDescription className="text-gray-400">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-300">
              Please check your email and click the confirmation link to activate your GymBuddy account.
            </p>
            <p className="text-sm text-gray-400">
              Didn't receive the email? Check your spam folder or{" "}
              <Link href="/auth/signup" className="text-neon-green hover:underline">
                try signing up again
              </Link>
            </p>
            <div className="pt-4">
              <Link href="/auth/login" className="text-neon-blue hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
