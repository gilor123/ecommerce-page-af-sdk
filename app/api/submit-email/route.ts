import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Generate a simple user ID (in production, you'd typically save to database)
    const generatedUserId = `user_backend_${Date.now()}` // Example if backend still generates an ID

    // Log the email submission
    console.log("Backend: Email received for potential processing:", {
      email,
      associatedBackendId: generatedUserId,
      timestamp: new Date().toISOString(),
    })

    // Here you would typically:
    // 1. Save the email to your database
    // 2. Send a confirmation email
    // 3. Create user account if needed

    return NextResponse.json({
      success: true,
      // The client now uses the email directly as userId, but backend might return its own ID
      message: "Email processed by backend.",
      backendProcessedId: generatedUserId,
    })
  } catch (error) {
    console.error("Error processing email on backend:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
