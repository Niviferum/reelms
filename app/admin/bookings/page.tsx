import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import BookingsList from './BookingsList'
import '../admin.css'

export default async function AdminBookingsPage() {
  const session = await getSession()

  if (!session.isAuthenticated || !session.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (user?.role !== 'ADMIN') {
    redirect('/')
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          discordId: true,
          discordUsername: true,
          discordAvatar: true,
          email: true,
        },
      },
      sessionType: {
        select: {
          name: true,
          slug: true,
          duration: true,
          priceMin: true,
        },
      },
      customProposal: {
        select: {
          id: true,
          name: true,
          price: true,
          duration: true,
        },
      },
    },
  })

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <div>
            <h1>Gestion des Réservations</h1>
            <p>Vue d'ensemble de toutes les réservations</p>
          </div>
          <a href="/admin" className="btn btn-secondary">← Retour au dashboard</a>
        </header>

        <BookingsList bookings={bookings} />
      </div>
    </div>
  )
}