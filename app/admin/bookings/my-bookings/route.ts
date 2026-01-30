import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { HttpStatus } from '@/lib/http-status'

export async function GET() {
  try {
    const user = await requireAuth()

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        sessionType: {
          select: {
            name: true,
            slug: true,
            duration: true,
            priceMin: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: HttpStatus.UNAUTHORIZED }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }
}