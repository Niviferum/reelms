import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover' as any,
  typescript: true,
})

// Helper pour créer une Checkout Session
export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  sessionTypeId,
  calendlyEventId,
  calendlyEventUri,
  scheduledAt,
  successUrl,
  cancelUrl,
}: {
  priceId: string
  userId: string
  userEmail: string | null
  sessionTypeId: string
  calendlyEventId?: string
  calendlyEventUri?: string
  scheduledAt?: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: userEmail || undefined,
    metadata: {
      userId,
      sessionTypeId,
      calendlyEventId: calendlyEventId || '',
      calendlyEventUri: calendlyEventUri || '',
      scheduledAt: scheduledAt || '',
    },
  })

  return session
}

// Helper pour vérifier la signature du webhook
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}