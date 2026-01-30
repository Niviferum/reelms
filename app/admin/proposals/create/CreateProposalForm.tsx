'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  discordUsername: string
  discordAvatar: string | null
}

interface PreselectedUser extends User {
  email: string | null
}

interface CreateProposalFormProps {
  users: User[]
  preselectedUserId?: string
  preselectedUser?: PreselectedUser | null
}

export default function CreateProposalForm({ 
  users, 
  preselectedUserId,
  preselectedUser 
}: CreateProposalFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    userId: preselectedUserId || '',
    name: '',
    description: '',
    duration: 180,
    price: 5000, // 50€ en centimes
    maxPlayers: 1,
    notes: '',
    expiresInDays: 7,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création')
      }

      router.push('/admin/proposals')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2)
  }

  return (
    <form onSubmit={handleSubmit} className="proposal-form">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {preselectedUser && (
        <div className="selected-user-info">
          <h3>Proposition pour :</h3>
          <div className="user-info">
            <img
              src={preselectedUser.discordAvatar 
                ? `https://cdn.discordapp.com/avatars/${preselectedUser.id}/${preselectedUser.discordAvatar}.png`
                : `https://cdn.discordapp.com/embed/avatars/0.png`}
              alt={preselectedUser.discordUsername}
              className="user-avatar"
            />
            <div>
              <p><strong>{preselectedUser.discordUsername}</strong></p>
              <p className="user-email">{preselectedUser.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sélection utilisateur */}
      {!preselectedUserId && (
        <div className="form-group">
          <label htmlFor="userId">Utilisateur *</label>
          <select
            id="userId"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            required
            className="form-input"
          >
            <option value="">Sélectionner un utilisateur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.discordUsername}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Nom de la session */}
      <div className="form-group">
        <label htmlFor="name">Nom de la session *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="ex: Campagne personnalisée - Les Ombres du Nord"
          className="form-input"
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={5}
          placeholder="Décrivez la session personnalisée..."
          className="form-input"
        />
      </div>

      {/* Durée et Prix */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="duration">Durée (minutes) *</label>
          <input
            type="number"
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            required
            min="30"
            step="30"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix (€) *</label>
          <input
            type="number"
            id="price"
            value={formatPrice(formData.price)}
            onChange={(e) => setFormData({ 
              ...formData, 
              price: Math.round(parseFloat(e.target.value) * 100) 
            })}
            required
            min="0"
            step="0.01"
            className="form-input"
          />
          <small>Prix en euros (sera converti en centimes)</small>
        </div>
      </div>

      {/* Nombre de joueurs */}
      <div className="form-group">
        <label htmlFor="maxPlayers">Nombre maximum de joueurs</label>
        <input
          type="number"
          id="maxPlayers"
          value={formData.maxPlayers || ''}
          onChange={(e) => setFormData({ 
            ...formData, 
            maxPlayers: e.target.value ? parseInt(e.target.value) : 1
          })}
          min="1"
          max="20"
          className="form-input"
        />
      </div>

      {/* Notes internes */}
      <div className="form-group">
        <label htmlFor="notes">Notes internes (optionnel)</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          placeholder="Notes visibles uniquement par les admins..."
          className="form-input"
        />
      </div>

      {/* Expiration */}
      <div className="form-group">
        <label htmlFor="expiresInDays">Expiration (jours)</label>
        <input
          type="number"
          id="expiresInDays"
          value={formData.expiresInDays}
          onChange={(e) => setFormData({ 
            ...formData, 
            expiresInDays: parseInt(e.target.value) 
          })}
          min="1"
          max="90"
          className="form-input"
        />
        <small>L'offre expirera automatiquement après ce délai</small>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-secondary"
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Création...' : 'Créer la proposition'}
        </button>
      </div>
    </form>
  )
}