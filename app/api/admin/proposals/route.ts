import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Vérifier que c'est un admin
    await requireAdmin()

    const body = await request.json()
    const {
      userId,
      name,
      description,
      duration,
      price,
      maxPlayers,
      notes,
      expiresInDays,
    } = body

    // Validation
    if (!userId || !name || !description || !duration || !price) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      )
    }

    // Calculer la date d'expiration
    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
      : null

    // Créer la proposition
    const proposal = await prisma.customSessionProposal.create({
      data: {
        userId,
        name,
        description,
        duration: parseInt(duration),
        price: parseInt(price),
        maxPlayers: maxPlayers ? parseInt(maxPlayers) : null,
        notes: notes || null,
        expiresAt,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            discordUsername: true,
            email: true,
          },
        },
      },
    })

    // TODO: Envoyer notification Discord/Email à l'utilisateur

    return NextResponse.json({
      success: true,
      proposal,
    })
  } catch (error) {
    console.error('Error creating proposal:', error)

    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: 'Accès refusé. Vous devez être administrateur.' },
        { status: 403 }
      )
    }

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la création de la proposition' },
      { status: 500 }
    )
  }
}

// GET - Liste des propositions
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (userId) {
      where.userId = userId
    }

    const proposals = await prisma.customSessionProposal.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            discordUsername: true,
            discordAvatar: true,
            email: true,
          },
        },
        booking: {
          select: {
            id: true,
            status: true,
            scheduledAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ proposals })
  } catch (error) {
    console.error('Error fetching proposals:', error)

    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la récupération des propositions' },
      { status: 500 }
    )
  }
}