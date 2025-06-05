"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { ShoppingCart, CreditCard, Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function EcommercePage() {
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("") // This will be the email itself
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive",
        icon: <AlertCircle className="h-4 w-4" />,
      })
      return
    }

    setIsSubmittingEmail(true)
    // Simulate API call for email submission
    try {
      // In a real app, you might call an API endpoint like /api/submit-email
      // For now, we just set the userId to the email
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

      setUserId(email)
      toast({
        title: "Email Set",
        description: `User ID set to: ${email}`,
        icon: <CheckCircle2 className="h-4 w-4" />,
      })
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Could not set email. Please try again.",
        variant: "destructive",
        icon: <AlertCircle className="h-4 w-4" />,
      })
    } finally {
      setIsSubmittingEmail(false)
    }
  }

  const sendEvent = async (eventType: "purchase" | "add_to_cart", endpoint: string) => {
    const currentUserId = userId || "anonymous" // Use email as userId if available, else 'anonymous'
    const currentEmail = email || ""

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          email: currentEmail,
          eventType,
          timestamp: new Date().toISOString(),
          // You can add more event-specific data here
          product: {
            id: "PROD123",
            name: "The Awesome Product",
            price: 29.99,
            currency: "USD",
          },
        }),
      })

      if (response.ok) {
        toast({
          title: `${eventType === "purchase" ? "Purchase" : "Add to Cart"} Successful`,
          description: `Event sent for user: ${currentUserId}`,
          icon: <CheckCircle2 className="h-4 w-4" />,
        })
      } else {
        throw new Error(`Failed to send ${eventType} event`)
      }
    } catch (error) {
      toast({
        title: "Event Error",
        description: `Could not send ${eventType} event. Please try again.`,
        variant: "destructive",
        icon: <AlertCircle className="h-4 w-4" />,
      })
    }
  }

  const handlePurchase = () => {
    sendEvent("purchase", "/api/events/purchase")
  }

  const handleAddToCart = () => {
    sendEvent("add_to_cart", "/api/events/add-to-cart")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-lg bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="p-6 sm:p-8 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Modern Checkout</CardTitle>
              <CardDescription className="text-slate-400">
                Experience our seamless and secure checkout process.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-8">
          {/* Product Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-white/5 rounded-lg border border-white/10">
            <Image
              src="/placeholder.svg?width=120&height=120"
              alt="Product Image"
              width={120}
              height={120}
              className="rounded-md object-cover shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white">The Awesome Product</h3>
              <p className="text-slate-400 text-sm">High-quality, innovative, and stylish.</p>
              <p className="text-2xl font-bold text-blue-400 mt-2">$29.99</p>
            </div>
          </div>

          {/* Email Input Section */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                Enter Email for User ID (Optional)
              </Label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full rounded-none rounded-l-md bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border border-blue-500 text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {isSubmittingEmail ? "Setting..." : "Set User ID"}
                </Button>
              </div>
            </div>
            {userId && (
              <div className="flex items-center space-x-2 p-3 bg-green-500/10 rounded-md border border-green-500/30">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <p className="text-sm text-green-300">
                  User ID set: <span className="font-semibold">{userId}</span>
                </p>
              </div>
            )}
          </form>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-3 text-base rounded-md transition-all duration-150 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </Button>
            <Button
              onClick={handlePurchase}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-base rounded-md transition-all duration-150 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Proceed to Purchase</span>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="p-6 sm:p-8 bg-white/5 border-t border-white/10">
          <p className="text-xs text-slate-500 text-center w-full">
            Your security is our priority. All transactions are encrypted.
          </p>
        </CardFooter>
      </Card>
      <p className="mt-8 text-center text-sm text-slate-500">Powered by Next.js & shadcn/ui</p>
    </div>
  )
}
