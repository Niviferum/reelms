import { getSession } from './session'
import { prisma } from './prisma'

export async function requireAdmin() {
  const session = await getSession()

  if (!session.isAuthenticated || !session.user) {
    throw new Error('Unauthorized')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (user?.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required')
  }

  return session.user
}