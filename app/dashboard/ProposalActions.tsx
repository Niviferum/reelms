'use client'

import { useState } from 'react'

interface ProposalActionsProps {
  proposalId: string
}

export default function ProposalActions({ proposalId }: ProposalActionsProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAccept = async () => {
    if (!confirm('Accepter cette proposition et procéder au paiement ?')) return

    setLoading(true)
    setError(null)

    try {
      // Appeler l'API qui va créer la session Stripe et rediriger
      const response = await fetch(`/api/user/proposals/${proposalId}/accept`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de l\'acceptation')
      }

      // Si c'est une redirection, suivre l'URL
      if (response.redirected) {
        window.location.href = response.url
        return
      }

      // Sinon récupérer l'URL de redirection
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleReject = async () => {
    if (!confirm('Refuser cette proposition ?')) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/user/proposals/${proposalId}/reject`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors du refus')
      }

      // Recharger la page
      window.location.href = '/dashboard?rejected=true'
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="proposal-actions">
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <button
        onClick={handleAccept}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Chargement...' : '✓ Accepter et Réserver'}
      </button>
      
      <button
        onClick={handleReject}
        disabled={loading}
        className="btn btn-secondary"
      >
        {loading ? 'Chargement...' : '✗ Refuser'}
      </button>
    </div>
  )
}