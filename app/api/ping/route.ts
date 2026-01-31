import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Requête ultra-légère pour garder la DB active
    await prisma.sessionType.count()
    
    return NextResponse.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Database alive'
    })
  } catch (error) {
    console.error('Ping error:', error)
    return NextResponse.json({ 
      status: 'error',
      error: 'Database unreachable',
      timestamp: new Date().toISOString()
    }, { status: 500})
  }
}