'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import '../checkout.css'

function CancelContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('booking_id')

  useEffect(() => {
    // Optionnel : supprimer la réservation annulée
    if (bookingId) {
      fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
        .catch(console.error)
    }
  }, [bookingId])

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-card cancel">
          <div className="icon">⚠️</div>
          <h1>Paiement Annulé</h1>
          <p className="cancel-message">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>

          <p>
            Si vous avez rencontré un problème, n'hésitez pas à nous contacter sur Discord 
            ou par email.
          </p>

          <div className="action-buttons">
            <a href="/sessions" className="btn btn-primary">
              Retour aux sessions
            </a>
            <a href="/dashboard" className="btn btn-secondary">
              Mon compte
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-card">
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  )
}