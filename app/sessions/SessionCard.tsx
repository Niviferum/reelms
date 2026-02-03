'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SessionType {
  id: string
  name: string
  slug: string
  description: string
  duration: number
  priceMin: number
  priceMax: number | null
  stripePriceId: string | null
  maxPlayers: number | null
  imageUrl: string | null
}

interface SessionCardProps {
  session: SessionType
}

export default function SessionCard({ session }: SessionCardProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  // Vérifier si c'est un prix variable
  const isPriceVariable = session.priceMax && session.priceMax !== session.priceMin

  const handleReservation = () => {
    if (isPriceVariable) {
      // Ouvrir la modale pour prix variable
      setShowModal(true)
      return
    }

    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Rediriger vers la page de paiement Stripe
    router.push(`/api/checkout?sessionType=${session.slug}`)
  }

  const formatPrice = () => {
    const minPrice = (session.priceMin / 100).toFixed(0)
    const maxPrice = session.priceMax ? (session.priceMax / 100).toFixed(0) : null

    if (maxPrice && maxPrice !== minPrice) {
      return `${minPrice}-${maxPrice}€`
    }
    return `${minPrice}€`
  }

  return (
    <>
      <div className="session-card">
        {/* Image ou placeholder */}
        <div className="session-image">
          {session.imageUrl ? (
            <img src={session.imageUrl} alt={session.name} />
          ) : (
            <div className="session-image-placeholder">
              <span>🎲</span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="session-content">
          <h3 className="session-name">{session.name}</h3>
          
          <p className="session-description">{session.description}</p>

          {/* Infos */}
          <div className="session-meta">
            <div className="meta-item">
              <span className="meta-label">Durée</span>
              <span className="meta-value">{session.duration} min</span>
            </div>
            {session.maxPlayers && (
              <div className="meta-item">
                <span className="meta-label">Joueurs</span>
                <span className="meta-value">Max {session.maxPlayers}</span>
              </div>
            )}
          </div>

          {/* Prix et CTA */}
          <div className="session-footer">
            <div className="session-price">{formatPrice()}</div>
            <button 
              onClick={handleReservation}
              className="btn btn-primary"
            >
              {isPriceVariable ? 'Nous Contacter' : 'Réserver'}
            </button>
          </div>
        </div>
      </div>

      {/* Modale Prix Variable */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowModal(false)}
              aria-label="Fermer"
            >
              ×
            </button>

            <div className="modal-header">
              <h2>{session.name}</h2>
              <p className="modal-price">{formatPrice()}</p>
            </div>

            <div className="modal-body">
              <p className="modal-intro">
                Cette session nécessite un devis personnalisé en fonction de vos besoins 
                spécifiques (durée, nombre de joueurs, contenu sur-mesure, etc.).
              </p>

              <div className="modal-steps">
                <h3>Comment procéder ?</h3>
                <ol>
                  <li>Contactez-nous sur Discord ou par email</li>
                  <li>Expliquez votre projet et vos attentes</li>
                  <li>Nous établirons un devis adapté</li>
                  <li>Une fois validé, vous pourrez réserver votre session</li>
                </ol>
              </div>

              <div className="modal-contact">
                <h3>Nous contacter</h3>
                <div className="contact-options">
                  <a 
                    href="https://discord.gg/w4z7m3JtdY" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-button discord"
                  >
                    <span>💬</span>
                    Discord
                  </a>
                  <a 
                    href="mailto:contact@tgwor.com"
                    className="contact-button email"
                  >
                    <span>📧</span>
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
