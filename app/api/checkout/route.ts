import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = await requireAuth()

    // Récupérer le slug de la session depuis les query params
    const searchParams = request.nextUrl.searchParams
    const sessionSlug = searchParams.get('sessionType')

    if (!sessionSlug) {
      return NextResponse.json(
        { error: 'Session type manquant' },
        { status: 400 }
      )
    }

    // Récupérer la session type depuis la DB
    const sessionType = await prisma.sessionType.findUnique({
      where: { slug: sessionSlug },
    })

    if (!sessionType || !sessionType.active) {
      return NextResponse.json(
        { error: 'Session introuvable ou inactive' },
        { status: 404 }
      )
    }

    if (!sessionType.stripePriceId) {
      return NextResponse.json(
        { error: 'Prix Stripe non configuré pour cette session' },
        { status: 500 }
      )
    }

    // Créer une réservation en statut AWAITING_PAYMENT
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        sessionTypeId: sessionType.id,
        status: 'AWAITING_PAYMENT',
      },
    })

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: sessionType.stripePriceId,
          quantity: 1,
        },
      ],
      customer_email: user.email || undefined,
      client_reference_id: booking.id,
      metadata: {
        bookingId: booking.id,
        userId: user.id,
        sessionTypeId: sessionType.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel?booking_id=${booking.id}`,
    })

    // Mettre à jour le booking avec l'ID de session Stripe
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripePaymentId: checkoutSession.id,
      },
    })

    // Rediriger vers Stripe Checkout
    return NextResponse.redirect(checkoutSession.url!)
  } catch (error) {
    console.error('Erreur création session Stripe:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/login`
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}