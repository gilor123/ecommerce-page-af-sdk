import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, email, eventType, timestamp, product } = await request.json()

    // userId can be the email or 'anonymous'
    // email can be the actual email or an empty string if not provided
    if (!userId) {
      return NextResponse.json({ error: "User ID (or 'anonymous') is required" }, { status: 400 })
    }

    // Log the purchase event
    console.log("Purchase Event Received:", {
      userId,
      email: email || "N/A", // Handle cases where email might be empty
      eventType,
      product,
      timestamp,
      eventSpecificData: {
        action: "purchase",
        source: "web_page_v2_design",
      },
    })

    // Simulate AppsFlyer event structure (for future integration)
    const appsFlyerEvent = {
      eventName: "af_purchase",
      eventValues: {
        af_revenue: product?.price || 0,
        af_currency: product?.currency || "USD",
        af_customer_user_id: userId,
        af_order_id: `order_${Date.now()}`,
        af_content_id: product?.id || "unknown_product",
        af_content_type: "product",
        timestamp: timestamp,
      },
    }

    console.log("Simulated AppsFlyer Purchase Event:", appsFlyerEvent)

    // Here you would typically:
    // 1. Save the event to your analytics database
    // 2. Send event to AppsFlyer (when integrated)
    // 3. Trigger any purchase-related workflows
    // 4. Update user purchase history

    return NextResponse.json({
      success: true,
      message: "Purchase event logged successfully",
      eventId: `purchase_evt_${Date.now()}`,
    })
  } catch (error) {
    console.error("Error logging purchase event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
