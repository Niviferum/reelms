import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createCheckoutSession } from '@/lib/stripe'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { HttpStatus } from '@/lib/http-status'

const checkoutSchema = z.object({
  sessionTypeId: z.string(),
  calendlyEventId: z.string().optional(),
  calendlyEventUri: z.string().optional(),
  scheduledAt: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()

    const body = await request.json()
    const { sessionTypeId, calendlyEventId, calendlyEventUri, scheduledAt } =
      checkoutSchema.parse(body)

    const sessionType = await prisma.sessionType.findUnique({
      where: { id: sessionTypeId },
    })

    if (!sessionType) {
      return NextResponse.json(
        { error: 'Session type not found' },
        { status: HttpStatus.NOT_FOUND }
      )
    }

    if (!sessionType.active) {
      return NextResponse.json(
        { error: 'Session type is not active' },
        { status: HttpStatus.BAD_REQUEST }
      )
    }

    if (!sessionType.stripePriceId) {
      return NextResponse.json(
        { error: 'This session type does not support online payment yet' },
        { status: HttpStatus.BAD_REQUEST }
      )
    }

    const checkoutSession = await createCheckoutSession({
      priceId: sessionType.stripePriceId,
      userId: user.id,
      userEmail: user.email,
      sessionTypeId: sessionType.id,
      calendlyEventId,
      calendlyEventUri,
      scheduledAt,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel`,
    })

    await prisma.booking.create({
      data: {
        userId: user.id,
        sessionTypeId: sessionType.id,
        stripeCheckoutId: checkoutSession.id,
        calendlyEventId: calendlyEventId || null,
        calendlyEventUri: calendlyEventUri || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: 'AWAITING_PAYMENT',
        playerCount: 1,
      },
    })

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message,
          }))
        },
        { status: HttpStatus.BAD_REQUEST }
      )
    }

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: HttpStatus.UNAUTHORIZED }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    )
  }
}