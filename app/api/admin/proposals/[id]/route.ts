import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET - Récupérer une proposition
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin()
    const { id } = await params

    const proposal = await prisma.customSessionProposal.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            discordUsername: true,
            discordAvatar: true,
            email: true,
          },
        },
        booking: true,
      },
    })

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposition introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({ proposal })
  } catch (error) {
    console.error('Error fetching proposal:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour une proposition
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin()
    const { id } = await params

    const body = await request.json()
    const { status, notes } = body

    const proposal = await prisma.customSessionProposal.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
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

    return NextResponse.json({
      success: true,
      proposal,
    })
  } catch (error) {
    console.error('Error updating proposal:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une proposition
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin()
    const { id } = await params

    await prisma.customSessionProposal.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Proposition supprimée',
    })
  } catch (error) {
    console.error('Error deleting proposal:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}