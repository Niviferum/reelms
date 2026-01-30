import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import './admin.css'

export default async function AdminDashboard() {
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

  // Stats rapides
  const [totalUsers, totalBookings, pendingProposals] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.customSessionProposal.count({
      where: { status: 'PENDING' },
    }),
  ])

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>Dashboard Administrateur</h1>
          <p>Gestion de la plateforme Reelms</p>
        </header>

        {/* Stats cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Utilisateurs</h3>
              <p className="stat-number">{totalUsers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎲</div>
            <div className="stat-content">
              <h3>Réservations</h3>
              <p className="stat-number">{totalBookings}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>Propositions en attente</h3>
              <p className="stat-number">{pendingProposals}</p>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="admin-sections">
          <a href="/admin/users" className="admin-section-card">
            <div className="section-icon">👤</div>
            <h2>Gestion des Utilisateurs</h2>
            <p>Voir les utilisateurs, créer des propositions personnalisées</p>
          </a>

          <a href="/admin/proposals" className="admin-section-card">
            <div className="section-icon">💼</div>
            <h2>Propositions Personnalisées</h2>
            <p>Gérer les propositions de sessions sur-mesure</p>
          </a>

          <a href="/admin/bookings" className="admin-section-card">
            <div className="section-icon">📅</div>
            <h2>Réservations</h2>
            <p>Voir toutes les réservations en cours</p>
          </a>

          <div className="admin-section-card disabled">
            <div className="section-icon">📖</div>
            <h2>Gestion du Lore</h2>
            <p className="coming-soon">🚧 Bientôt disponible</p>
            <p>Éditeur de contenu pour l'univers</p>
          </div>
        </div>
      </div>
    </div>
  )
}