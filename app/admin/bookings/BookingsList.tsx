'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Booking {
  id: string
  status: string
  stripePaymentId: string | null
  stripeCheckoutId: string | null
  scheduledAt: Date | null
  calendlyEventId: string | null
  calendlyEventUri: string | null
  playerCount: number
  notes: string | null
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    discordId: string
    discordUsername: string
    discordAvatar: string | null
    email: string | null
  }
  sessionType: {
    name: string
    slug: string
    duration: number
    priceMin: number
  }
  customProposal: {
    id: string
    name: string
    price: number
    duration: number
  } | null
}

interface BookingsListProps {
  bookings: Booking[]
}

export default function BookingsList({ bookings }: BookingsListProps) {
  const router = useRouter()
  const [filter, setFilter] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === 'ALL' || booking.status === filter
    const matchesSearch = 
      booking.user.discordUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.customProposal 
        ? booking.customProposal.name.toLowerCase().includes(searchTerm.toLowerCase())
        : booking.sessionType.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const getAvatarUrl = (user: Booking['user']) => {
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

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2) + '€'
  }

  const getBookingType = (booking: Booking) => {
    if (booking.customProposal) {
      return {
        name: booking.customProposal.name,
        duration: booking.customProposal.duration,
        price: booking.customProposal.price,
        isCustom: true,
      }
    }
    return {
      name: booking.sessionType.name,
      duration: booking.sessionType.duration,
      price: booking.sessionType.priceMin,
      isCustom: false,
    }
  }

  const statusCounts = {
    ALL: bookings.length,
    PENDING: bookings.filter(b => b.status === 'PENDING').length,
    AWAITING_PAYMENT: bookings.filter(b => b.status === 'AWAITING_PAYMENT').length,
    CONFIRMED: bookings.filter(b => b.status === 'CONFIRMED').length,
    CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
    COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
  }

  return (
    <div className="bookings-list">
      {/* Filtres et recherche */}
      <div className="list-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par utilisateur ou session..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-bar">
          <button
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            Toutes ({statusCounts.ALL})
          </button>
          <button
            className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            En attente ({statusCounts.PENDING})
          </button>
          <button
            className={`filter-btn ${filter === 'AWAITING_PAYMENT' ? 'active' : ''}`}
            onClick={() => setFilter('AWAITING_PAYMENT')}
          >
            Paiement ({statusCounts.AWAITING_PAYMENT})
          </button>
          <button
            className={`filter-btn ${filter === 'CONFIRMED' ? 'active' : ''}`}
            onClick={() => setFilter('CONFIRMED')}
          >
            Confirmées ({statusCounts.CONFIRMED})
          </button>
          <button
            className={`filter-btn ${filter === 'COMPLETED' ? 'active' : ''}`}
            onClick={() => setFilter('COMPLETED')}
          >
            Terminées ({statusCounts.COMPLETED})
          </button>
        </div>
      </div>

      {/* Liste des réservations */}
      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <p>Aucune réservation trouvée</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((booking) => {
            const bookingInfo = getBookingType(booking)
            
            return (
              <div key={booking.id} className="booking-card-admin">
                {/* Header */}
                <div className="booking-header">
                  <div className="user-info">
                    <img
                      src={getAvatarUrl(booking.user)}
                      alt={booking.user.discordUsername}
                      className="user-avatar-small"
                    />
                    <div>
                      <strong>{booking.user.discordUsername}</strong>
                      <br />
                      <small>{booking.user.email}</small>
                    </div>
                  </div>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>
                    {getStatusLabel(booking.status)}
                  </span>
                </div>

                {/* Content */}
                <div className="booking-content">
                  <div className="booking-title">
                    <h3>{bookingInfo.name}</h3>
                    {bookingInfo.isCustom && (
                      <span className="custom-badge">Personnalisée</span>
                    )}
                  </div>

                  <div className="booking-details">
                    <div className="detail-row">
                      <span className="detail-label">Durée :</span>
                      <span className="detail-value">{bookingInfo.duration} min</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Prix :</span>
                      <span className="detail-value price">{formatPrice(bookingInfo.price)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Joueurs :</span>
                      <span className="detail-value">{booking.playerCount}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Créée le :</span>
                      <span className="detail-value">
                        {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    {booking.scheduledAt && (
                      <div className="detail-row">
                        <span className="detail-label">Planifiée le :</span>
                        <span className="detail-value scheduled">
                          {new Date(booking.scheduledAt).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(booking.scheduledAt).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Références de paiement */}
                  {booking.stripePaymentId && (
                    <div className="payment-references">
                      <h4>Références de paiement</h4>
                      <div className="reference-item">
                        <span className="ref-label">ID Réservation :</span>
                        <code className="ref-value">{booking.id}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(booking.id)
                            alert('ID copié !')
                          }}
                          className="copy-btn"
                          title="Copier"
                        >
                          📋
                        </button>
                      </div>
                      <div className="reference-item">
                        <span className="ref-label">ID Paiement Stripe :</span>
                        <code className="ref-value">{booking.stripePaymentId}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(booking.stripePaymentId!)
                            alert('ID Stripe copié !')
                          }}
                          className="copy-btn"
                          title="Copier"
                        >
                          📋
                        </button>
                      </div>
                      {booking.stripeCheckoutId && (
                        <div className="reference-item">
                          <span className="ref-label">ID Session Checkout :</span>
                          <code className="ref-value">{booking.stripeCheckoutId}</code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(booking.stripeCheckoutId!)
                              alert('ID Session copié !')
                            }}
                            className="copy-btn"
                            title="Copier"
                          >
                            📋
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {booking.notes && (
                    <div className="booking-notes">
                      <strong>Notes :</strong>
                      <p>{booking.notes}</p>
                    </div>
                  )}

                  {/* Infos techniques */}
                  <div className="booking-tech-info">
                    {booking.stripePaymentId && (
                      <div className="tech-info-item">
                        <span>💳</span>
                        <small>Paiement Stripe</small>
                      </div>
                    )}
                    {booking.calendlyEventId && (
                      <div className="tech-info-item">
                        <span>📅</span>
                        <small>Calendly planifié</small>
                      </div>
                    )}
                    {booking.customProposal && (
                      <div className="tech-info-item">
                        <span>⭐</span>
                        <small>Proposition custom</small>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="booking-actions">
                  <button
                    onClick={() => router.push(`/admin/users?userId=${booking.user.id}`)}
                    className="btn btn-secondary btn-small"
                  >
                    👤 Voir l'utilisateur
                  </button>
                  {booking.stripePaymentId && (
                    
                    <a href={`https://dashboard.stripe.com/${process.env.NODE_ENV === 'production' ? '' : 'test/'}payments/${booking.stripePaymentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-small"
                    >
                      💳 Voir dans Stripe
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}