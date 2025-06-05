# AppsFlyer Web SDK Setup Instructions

## 1. Get Your AppsFlyer Web Dev Key

1. Log in to your AppsFlyer dashboard
2. Navigate to **My Apps** → **Brand Bundles**
3. Copy your **WEB_DEV_KEY** from the dashboard

## 2. Set Environment Variable

Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_AF_WEB_DEV_KEY=your_actual_web_dev_key_here
```

Replace `your_actual_web_dev_key_here` with the key you copied from AppsFlyer.

## 3. Deploy to Vercel

1. In your Vercel dashboard, go to your project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_AF_WEB_DEV_KEY`
   - **Value**: Your actual AppsFlyer Web Dev Key
   - **Environment**: Production, Preview, Development (select all)

## 4. Testing the Integration

### Local Testing
1. Start your development server: `pnpm dev`
2. Open browser DevTools → Network tab
3. Filter by `wa.appsflyer.com`
4. Refresh the page and interact with buttons
5. You should see network requests where `site_id` equals your web dev key

### What Each Button Does
- **Set User ID**: Sets customer user ID and tracks login event
- **Add to Cart**: Tracks add-to-cart event with product details  
- **Proceed to Purchase**: Tracks purchase event with revenue data

### Expected AppsFlyer Events
1. **Automatic visit tracking** on page load
2. **Login event** when user sets email
3. **Add to cart event** with product SKU and price
4. **Purchase event** with revenue and currency

## 5. Privacy Compliance (Optional)

If you need to wait for cookie consent before tracking:

1. Change `measurementStatus: false` in `app/layout.tsx`
2. On consent, call: `window.AF_SDK.PLUGINS.PBA.enableMeasurement()`

## 6. Verifying Data in AppsFlyer

- Events should appear in your AppsFlyer dashboard under **Raw Data** → **Web Events**
- Use AppsFlyer's **Test PBA Web** tool for real-time event validation
- Check that user attribution is working correctly

## Troubleshooting

- Make sure the Web Dev Key is correctly set in environment variables
- Check browser console for any AppsFlyer-related errors
- Verify network requests are returning 200 status codes
- Ensure only one AppsFlyer script tag is present in the page 