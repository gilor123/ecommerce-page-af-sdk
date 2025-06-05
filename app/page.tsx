"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { ShoppingCart, CreditCard, Mail, AlertCircle, CheckCircle2, User, Store } from "lucide-react"
import Image from "next/image"
import { setCuid, trackAddToCart, trackPurchase, trackLogin } from "@/lib/appsflyer"

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
      
      // AppsFlyer: Set customer user ID and track login event
      setCuid(email)
      trackLogin()
      
      toast({
        title: "Sign-in Successful",
        description: `Welcome! User ID set to: ${email}`,
      })
    } catch (error) {
      toast({
        title: "Sign-in Error",
        description: "Could not sign in. Please try again.",
        variant: "destructive",
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
        })
      } else {
        throw new Error(`Failed to send ${eventType} event`)
      }
    } catch (error) {
      toast({
        title: "Event Error",
        description: `Could not send ${eventType} event. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handlePurchase = () => {
    // Send to existing API
    sendEvent("purchase", "/api/events/purchase")
    
    // AppsFlyer: Track purchase event
    trackPurchase({
      sku: "PROD123",
      price: 29.99,
      quantity: 1,
      currency: "USD"
    })
  }

  const handleAddToCart = () => {
    // Send to existing API
    sendEvent("add_to_cart", "/api/events/add-to-cart")
    
    // AppsFlyer: Track add to cart event
    trackAddToCart({
      sku: "PROD123",
      price: 29.99,
      name: "The Awesome Product"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Store className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            AppsFlyer Demo Store
          </h1>
        </div>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          A simple demo page to easily test AppsFlyer Web SDK integration and event tracking
        </p>
      </div>

      {/* Three Action Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sign-in Card */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-purple-500/20 rounded-xl w-fit mb-4">
                <User className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
              <CardDescription className="text-slate-400">
                Identify yourself to start tracking your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email Address
                  </Label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-500" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-150"
                >
                  {isSubmittingEmail ? "Signing In..." : "Sign In & Track"}
                </Button>
              </form>
              
              {userId && (
                <div className="flex items-center space-x-2 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-green-300 font-medium">Signed In Successfully</p>
                    <p className="text-xs text-green-400">User: {userId}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add to Cart Card */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-blue-500/20 rounded-xl w-fit mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Add to Cart</CardTitle>
              <CardDescription className="text-slate-400">
                Track interest and intent to purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <ShoppingCart className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Ready to Add?</h3>
                  <p className="text-sm text-slate-400">
                    Click below to add this amazing product to your cart and track the event.
                  </p>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-150 transform hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Card */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-green-500/20 rounded-xl w-fit mb-4">
                <CreditCard className="h-8 w-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Purchase</CardTitle>
              <CardDescription className="text-slate-400">
                Complete your purchase with revenue tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                  <CreditCard className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Complete Purchase</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Track the final conversion event with full revenue data.
                  </p>
                  <div className="text-2xl font-bold text-green-400">$29.99</div>
                </div>
                <Button
                  onClick={handlePurchase}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-150 transform hover:scale-105"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Purchase Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10">
        <p className="text-sm text-slate-500 mb-2">
          Powered by Next.js, shadcn/ui & AppsFlyer Web SDK
        </p>
        <p className="text-xs text-slate-600">
          Open DevTools → Network to see AppsFlyer tracking in action
        </p>
      </div>
    </div>
  )
}
