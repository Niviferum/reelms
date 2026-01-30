import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await requireAuth()
    const { id } = await params

    // Récupérer la proposition
    const proposal = await prisma.customSessionProposal.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposition introuvable' },
        { status: 404 }
      )
    }

    // Vérifier que c'est bien la proposition de cet utilisateur
    if (proposal.userId !== user.id) {
      return NextResponse.json(
        { error: 'Cette proposition ne vous appartient pas' },
        { status: 403 }
      )
    }

    // Vérifier que la proposition est en attente
    if (proposal.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Cette proposition n\'est plus disponible' },
        { status: 400 }
      )
    }

    // Vérifier si expirée
    if (proposal.expiresAt && new Date(proposal.expiresAt) < new Date()) {
      await prisma.customSessionProposal.update({
        where: { id: proposal.id },
        data: { status: 'EXPIRED' },
      })
      return NextResponse.json(
        { error: 'Cette proposition a expiré' },
        { status: 400 }
      )
    }

    // Créer un produit Stripe pour cette proposition
    const stripeProduct = await stripe.products.create({
      name: proposal.name,
      description: proposal.description,
      metadata: {
        proposalId: proposal.id,
        userId: user.id,
      },
    })

    // Créer un prix Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: proposal.price,
      currency: 'eur',
    })

    // Mettre à jour la proposition avec les IDs Stripe
    await prisma.customSessionProposal.update({
      where: { id: proposal.id },
      data: {
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      },
    })

    // Créer une réservation en statut AWAITING_PAYMENT
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        sessionTypeId: (await prisma.sessionType.findFirst())!.id, // Placeholder, pas utilisé pour custom
        status: 'AWAITING_PAYMENT',
        playerCount: proposal.maxPlayers || 1,
      },
    })

    // Lier la proposition au booking
    await prisma.customSessionProposal.update({
      where: { id: proposal.id },
      data: {
        bookingId: booking.id,
        status: 'ACCEPTED',
      },
    })

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      customer_email: proposal.user.email || undefined,
      client_reference_id: booking.id,
      metadata: {
        bookingId: booking.id,
        proposalId: proposal.id,
        userId: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })

    // Mettre à jour le booking avec l'ID de session Stripe
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripePaymentId: checkoutSession.id,
      },
    })

    // Retourner l'URL au lieu de rediriger
    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Error accepting proposal:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de l\'acceptation de la proposition' },
      { status: 500 }
    )
  }
}