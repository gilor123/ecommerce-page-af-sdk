import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, email, eventType, timestamp, product } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID (or 'anonymous') is required" }, { status: 400 })
    }

    console.log("Add to Cart Event Received:", {
      userId,
      email: email || "N/A",
      eventType,
      product,
      timestamp,
      eventSpecificData: {
        action: "add_to_cart",
        source: "web_page_v2_design",
      },
    })

    const appsFlyerEvent = {
      eventName: "af_add_to_cart",
      eventValues: {
        af_content_id: product?.id || "unknown_product",
        af_content_type: "product",
        af_customer_user_id: userId,
        af_quantity: 1, // Assuming quantity is 1 for this simple example
        af_price: product?.price || 0,
        af_currency: product?.currency || "USD",
        timestamp: timestamp,
      },
    }

    console.log("Simulated AppsFlyer Add to Cart Event:", appsFlyerEvent)

    return NextResponse.json({
      success: true,
      message: "Add to cart event logged successfully",
      eventId: `cart_evt_${Date.now()}`,
    })
  } catch (error) {
    console.error("Error logging add to cart event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
