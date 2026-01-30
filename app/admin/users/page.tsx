import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import UsersList from './UsersList'
import '../admin.css'

export default async function AdminUsersPage() {
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

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          bookings: true,
          customProposals: true,
        },
      },
    },
  })

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>Gestion des Utilisateurs</h1>
          <a href="/admin" className="btn btn-secondary">← Retour au dashboard</a>
        </header>

        <UsersList users={users} />
      </div>
    </div>
  )
}