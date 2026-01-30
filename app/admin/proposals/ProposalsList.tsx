'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Proposal {
  id: string
  name: string
  description: string
  duration: number
  price: number
  maxPlayers: number | null
  status: string
  notes: string | null
  createdAt: Date
  expiresAt: Date | null
  user: {
    id: string
    discordId: string
    discordUsername: string
    discordAvatar: string | null
    email: string | null
  }
  booking: {
    id: string
    status: string
    scheduledAt: Date | null
  } | null
}

interface ProposalsListProps {
  proposals: Proposal[]
}

export default function ProposalsList({ proposals }: ProposalsListProps) {
  const router = useRouter()
  const [filter, setFilter] = useState<string>('ALL')
  const [loading, setLoading] = useState<string | null>(null)

  const filteredProposals = proposals.filter((proposal) => {
    if (filter === 'ALL') return true
    return proposal.status === filter
  })

  const getAvatarUrl = (user: Proposal['user']) => {
    if (user.discordAvatar) {
      return `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
    }
    return `https://cdn.discordapp.com/embed/avatars/0.png`
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'En attente',
      ACCEPTED: 'Acceptée',
      REJECTED: 'Refusée',
      EXPIRED: 'Expirée',
    }
    return labels[status] || status
  }

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      PENDING: 'status-pending',
      ACCEPTED: 'status-accepted',
      REJECTED: 'status-rejected',
      EXPIRED: 'status-expired',
    }
    return classes[status] || ''
  }

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2) + '€'
  }

  const handleUpdateStatus = async (proposalId: string, newStatus: string) => {
    if (!confirm(`Confirmer le changement de statut ?`)) return

    setLoading(proposalId)

    try {
      const response = await fetch(`/api/admin/proposals/${proposalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      router.refresh()
    } catch (error) {
      alert('Erreur lors de la mise à jour')
      console.error(error)
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (proposalId: string) => {
    if (!confirm('Supprimer cette proposition ? Cette action est irréversible.')) return

    setLoading(proposalId)

    try {
      const response = await fetch(`/api/admin/proposals/${proposalId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      router.refresh()
    } catch (error) {
      alert('Erreur lors de la suppression')
      console.error(error)
    } finally {
      setLoading(null)
    }
  }

  const isExpired = (expiresAt: Date | null) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  return (
    <div className="proposals-list">
      {/* Filtres */}
      <div className="filters-bar">
        <button
          className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
          onClick={() => setFilter('ALL')}
        >
          Toutes ({proposals.length})
        </button>
        <button
          className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
          onClick={() => setFilter('PENDING')}
        >
          En attente ({proposals.filter(p => p.status === 'PENDING').length})
        </button>
        <button
          className={`filter-btn ${filter === 'ACCEPTED' ? 'active' : ''}`}
          onClick={() => setFilter('ACCEPTED')}
        >
          Acceptées ({proposals.filter(p => p.status === 'ACCEPTED').length})
        </button>
        <button
          className={`filter-btn ${filter === 'REJECTED' ? 'active' : ''}`}
          onClick={() => setFilter('REJECTED')}
        >
          Refusées ({proposals.filter(p => p.status === 'REJECTED').length})
        </button>
      </div>

      {/* Liste des propositions */}
      {filteredProposals.length === 0 ? (
        <div className="empty-state">
          <p>Aucune proposition trouvée</p>
        </div>
      ) : (
        <div className="proposals-grid">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="proposal-card">
              {/* Header */}
              <div className="proposal-header">
                <div className="user-info">
                  <img
                    src={getAvatarUrl(proposal.user)}
                    alt={proposal.user.discordUsername}
                    className="user-avatar-small"
                  />
                  <div>
                    <strong>{proposal.user.discordUsername}</strong>
                    <br />
                    <small>{proposal.user.email}</small>
                  </div>
                </div>
                <span className={`status-badge ${getStatusClass(proposal.status)}`}>
                  {getStatusLabel(proposal.status)}
                </span>
              </div>

              {/* Content */}
              <div className="proposal-content">
                <h3>{proposal.name}</h3>
                <p className="proposal-description">{proposal.description}</p>

                <div className="proposal-meta">
                  <div className="meta-row">
                    <span className="meta-label">Durée :</span>
                    <span className="meta-value">{proposal.duration} min</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Prix :</span>
                    <span className="meta-value price">{formatPrice(proposal.price)}</span>
                  </div>
                  {proposal.maxPlayers && (
                    <div className="meta-row">
                      <span className="meta-label">Joueurs :</span>
                      <span className="meta-value">Max {proposal.maxPlayers}</span>
                    </div>
                  )}
                  <div className="meta-row">
                    <span className="meta-label">Créée le :</span>
                    <span className="meta-value">
                      {new Date(proposal.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {proposal.expiresAt && (
                    <div className="meta-row">
                      <span className="meta-label">Expire le :</span>
                      <span className={`meta-value ${isExpired(proposal.expiresAt) ? 'expired' : ''}`}>
                        {new Date(proposal.expiresAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                </div>

                {proposal.notes && (
                  <div className="proposal-notes">
                    <strong>Notes internes :</strong>
                    <p>{proposal.notes}</p>
                  </div>
                )}

                {proposal.booking && (
                  <div className="proposal-booking">
                    <strong>Réservation associée :</strong>
                    <p>
                      Statut : {proposal.booking.status}<br />
                      {proposal.booking.scheduledAt && (
                        <>Planifiée : {new Date(proposal.booking.scheduledAt).toLocaleDateString('fr-FR')}</>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {proposal.status === 'PENDING' && (
                <div className="proposal-actions">
                  
                  <button
                    onClick={() => handleDelete(proposal.id)}
                    disabled={loading === proposal.id}
                    className="btn btn-secondary btn-small"
                  >
                    🗑 Supprimer
                  </button>
                </div>
              )}

              {proposal.status !== 'PENDING' && (
                <div className="proposal-actions">
                  <button
                    onClick={() => handleDelete(proposal.id)}
                    disabled={loading === proposal.id}
                    className="btn btn-secondary btn-small"
                  >
                    🗑 Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}