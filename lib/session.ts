import { getIronSession, IronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { AuthSession } from '@/types/auth'

export const sessionOptions = {
  password: process.env.NEXTAUTH_SECRET!,
  cookieName: 'reelms_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  },
}

export async function getSession(): Promise<IronSession<AuthSession>> {
  return getIronSession<AuthSession>(await cookies(), sessionOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session.user || null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'ADMIN') {
    throw new Error('Forbidden')
  }
  return user
}