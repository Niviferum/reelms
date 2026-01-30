import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { constructWebhookEvent } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { HttpStatus } from '@/lib/http-status'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: HttpStatus.BAD_REQUEST }
    )
  }

  let event: Stripe.Event

  try {
    event = constructWebhookEvent(body, signature)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: HttpStatus.BAD_REQUEST }
    )
  }

  console.log(`[Webhook] Received event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log(`[Webhook] Checkout completed: ${session.id}`)

        const metadata = session.metadata
        if (!metadata?.userId || !metadata?.sessionTypeId) {
          console.error('[Webhook] Missing metadata in checkout session')
          break
        }

        const booking = await prisma.booking.findFirst({
          where: {
            stripeCheckoutId: session.id,
            userId: metadata.userId,
          },
        })

        if (!booking) {
          console.error(`[Webhook] Booking not found for checkout ${session.id}`)
          break
        }

        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            status: 'CONFIRMED',
            stripePaymentId: session.payment_intent as string,
          },
        })

        console.log(`[Webhook] Booking ${booking.id} confirmed`)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`[Webhook] Payment succeeded: ${paymentIntent.id}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`[Webhook] Payment failed: ${paymentIntent.id}`)

        const booking = await prisma.booking.findFirst({
          where: {
            stripePaymentId: paymentIntent.id,
          },
        })

        if (booking) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'CANCELLED' },
          })
          console.log(`[Webhook] Booking ${booking.id} cancelled due to payment failure`)
        }
        break
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Error processing event:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }
}