import { NextResponse } from 'next/server'
import { DiscordAPI } from '@/lib/discord'

export async function GET() {
  try {
    const authUrl = DiscordAPI.getOAuthURL()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error initiating Discord OAuth:', error)
    return NextResponse.json(
      { error: 'Failed to initiate authentication' },
      { status: 500 }
    )
  }
}