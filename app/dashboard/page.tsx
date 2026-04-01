import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import ProposalActions from './ProposalActions'
import './dashboard.css'

interface PageProps {
  searchParams: Promise<{ rejected?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams
  const session = await getSession()

  if (!session.isAuthenticated || !session.user) {
    redirect('/login')
  }

  if (session.user.role === 'ADMIN') {
    redirect('/admin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect('/login')
  }

  // Récupérer les réservations
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
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
  })

  // Récupérer les propositions PENDING
  const pendingProposals = await prisma.customSessionProposal.findMany({
    where: {
      userId: user.id,
      status: 'PENDING',
    },
    orderBy: { createdAt: 'desc' },
  })

  const getAvatarUrl = () => {
    if (user.discordAvatar) {
      return `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
    }
    return `https://cdn.discordapp.com/embed/avatars/0.png`
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'En attente',
      AWAITING_PAYMENT: 'En attente de paiement',
      CONFIRMED: 'Confirmée',
      CANCELLED: 'Annulée',
      COMPLETED: 'Terminée',
    }
    return labels[status] || status
  }

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      PENDING: 'status-pending',
      AWAITING_PAYMENT: 'status-awaiting',
      CONFIRMED: 'status-confirmed',
      CANCELLED: 'status-cancelled',
      COMPLETED: 'status-completed',
    }
    return classes[status] || ''
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header utilisateur */}
        <header className="dashboard-header">
          <div className="user-profile">
            <img
              src={getAvatarUrl()}
              alt={user.discordUsername}
              className="user-avatar"
            />
            <div>
              <h1>Bienvenue, {user.discordUsername}</h1>
              <span className={`role-badge ${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="btn btn-secondary">
              Se déconnecter
            </button>
          </form>
        </header>

        {/* Message de confirmation refus */}
        {params.rejected === 'true' && (
          <div className="alert alert-info">
            <p>✓ Proposition refusée avec succès.</p>
          </div>
        )}

        {/* Propositions en attente */}
        {pendingProposals.length > 0 && (
          <section className="proposals-section">
            <h2>🎁 Nouvelles Propositions Personnalisées</h2>
            <p className="section-subtitle">
              Le maître du jeu vous a préparé des offres sur-mesure
            </p>
            
            <div className="proposals-list">
              {pendingProposals.map((proposal) => (
                <div key={proposal.id} className="proposal-card-user">
                  <div className="proposal-badge">Nouveau !</div>
                  
                  <h3>{proposal.name}</h3>
                  <p className="proposal-description">{proposal.description}</p>

                  <div className="proposal-details">
                    <div className="detail-item">
                      <span className="detail-label">Durée</span>
                      <span className="detail-value">{proposal.duration} min</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Prix</span>
                      <span className="detail-value price">
                        {(proposal.price / 100).toFixed(2)}€
                      </span>
                    </div>
                    {proposal.maxPlayers && (
                      <div className="detail-item">
                        <span className="detail-label">Joueurs</span>
                        <span className="detail-value">Max {proposal.maxPlayers}</span>
                      </div>
                    )}
                  </div>

                  {proposal.expiresAt && (
                    <p className="proposal-expiry">
                      ⏰ Offre valable jusqu'au{' '}
                      {new Date(proposal.expiresAt).toLocaleDateString('fr-FR')}
                    </p>
                  )}

                  <ProposalActions proposalId={proposal.id} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mes réservations */}
        <section className="bookings-section">
          <h2>Mes Réservations</h2>

          {bookings.length === 0 ? (
            <div className="empty-state">
              <p>Vous n'avez pas encore de réservation.</p>
              <a href="/sessions" className="btn btn-primary">
                Réserver une session
              </a>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <h3>{booking.sessionType.name}</h3>
                  
                  <div className="booking-info">
                    <div>
                      <strong>Durée :</strong> {booking.sessionType.duration} min
                    </div>
                    <div>
                      <strong>Prix :</strong>{' '}
                      {(booking.sessionType.priceMin / 100).toFixed(2)}€
                    </div>
                    {booking.scheduledAt && (
                      <div>
                        <strong>Date :</strong>{' '}
                        {new Date(booking.scheduledAt).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>

                  <div className="booking-status">
                    <span className={`status-badge ${getStatusClass(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}