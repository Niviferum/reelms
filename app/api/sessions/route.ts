import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { HttpStatus } from '@/lib/http-status'

export async function GET() {
  try {
    const sessions = await prisma.sessionType.findMany({
      where: {
        active: true,
      },
      orderBy: {
        priceMin: 'asc',
      },
    })

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }
}