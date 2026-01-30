import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'

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

    // Marquer comme refusée
    await prisma.customSessionProposal.update({
      where: { id: proposal.id },
      data: { status: 'REJECTED' },
    })

    // TODO: Notifier l'admin du refus

    // Rediriger vers le dashboard avec message de confirmation
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?rejected=true`
    )
  } catch (error) {
    console.error('Error rejecting proposal:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`)
    }

    return NextResponse.json(
      { error: 'Erreur lors du refus de la proposition' },
      { status: 500 }
    )
  }
}