import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Paiement non confirmé' },
        { status: 400 }
      )
    }

    // Mettre à jour le booking
    const bookingId = session.metadata?.bookingId

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking introuvable' },
        { status: 404 }
      )
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CONFIRMED',
        stripePaymentId: sessionId,
      },
      include: {
        sessionType: true,
        user: true,
      },
    })

    // TODO: Envoyer email de confirmation
    // TODO: Envoyer lien Calendly

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error('Erreur confirmation paiement:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la confirmation du paiement' },
      { status: 500 }
    )
  }
}