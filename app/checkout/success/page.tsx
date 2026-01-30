'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import '../../checkout/checkout.css'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError('Session invalide')
      setLoading(false)
      return
    }

    fetch(`/api/checkout/confirm?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Erreur lors de la confirmation du paiement')
        setLoading(false)
      })
  }, [sessionId])

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-card">
            <div className="loading-spinner"></div>
            <h1>Confirmation en cours...</h1>
            <p>Veuillez patienter pendant que nous confirmons votre paiement.</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-card error">
            <div className="icon">❌</div>
            <h1>Erreur</h1>
            <p>{error}</p>
            <a href="/sessions" className="btn btn-secondary">
              Retour aux sessions
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-card success">
          <div className="icon">✅</div>
          <h1>Paiement Confirmé !</h1>
          <p className="success-message">
            Votre réservation a été enregistrée avec succès. Vous allez recevoir 
            un email de confirmation sous peu.
          </p>

          <div className="next-steps">
            <h2>Prochaines étapes</h2>
            <ol>
              <li>Vous recevrez un lien Calendly pour planifier votre session</li>
              <li>Le maître du jeu vous contactera sur Discord 48h avant la session</li>
              <li>Préparez votre personnage et rejoignez l'aventure !</li>
            </ol>
          </div>

          <div className="action-buttons">
            <a href="/dashboard" className="btn btn-primary">
              Voir mes réservations
            </a>
            <a href="/sessions" className="btn btn-secondary">
              Réserver une autre session
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-card">
            <div className="loading-spinner"></div>
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}