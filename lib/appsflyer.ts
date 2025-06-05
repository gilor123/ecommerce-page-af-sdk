declare global { 
  interface Window { 
    AF?: any 
  } 
}

// Generic event logger for AppsFlyer
export function afEvent(payload: Record<string, any>) {
  if (typeof window !== 'undefined' && window.AF) {
    console.log('AppsFlyer: Sending event', payload);
    window.AF('pba', 'event', payload);
  } else {
    console.warn('AppsFlyer: SDK not loaded or not in browser environment');
  }
}

// Identify visitor with customer user ID
export function setCuid(id: string) {
  if (typeof window !== 'undefined' && window.AF) {
    console.log('AppsFlyer: Setting customer user ID', id);
    window.AF('pba', 'setCustomerUserId', id); // must be string
  } else {
    console.warn('AppsFlyer: SDK not loaded or not in browser environment');
  }
}

// Helper functions for specific events
export function trackAddToCart(product: { sku: string; price: number; name?: string }) {
  afEvent({
    eventType: 'EVENT',
    eventName: 'add_to_cart',
    eventValue: { 
      sku: product.sku, 
      price: product.price,
      product_name: product.name 
    }
  });
}

export function trackPurchase(product: { sku: string; price: number; quantity?: number; currency?: string }) {
  afEvent({
    eventType: 'EVENT',
    eventName: 'purchase',
    eventRevenue: product.price,
    eventRevenueCurrency: product.currency || 'USD',
    eventValue: { 
      sku: product.sku, 
      quantity: product.quantity || 1,
      price: product.price
    }
  });
}

export function trackLogin() {
  afEvent({ 
    eventType: 'EVENT', 
    eventName: 'login' 
  });
} 