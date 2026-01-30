'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  discordUsername: string
  discordAvatar: string | null
  email: string | null
  role: string
  createdAt: Date
  _count: {
    bookings: number
    customProposals: number
  }
}

interface UsersListProps {
  users: User[]
}

export default function UsersList({ users }: UsersListProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter((user) =>
    user.discordUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAvatarUrl = (user: User) => {
    if (user.discordAvatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.discordAvatar}.png`
    }
    return `https://cdn.discordapp.com/embed/avatars/0.png`
  }

  return (
    <div className="users-list">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Users table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Réservations</th>
              <th>Propositions</th>
              <th>Inscrit le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <img
                      src={getAvatarUrl(user)}
                      alt={user.discordUsername}
                      className="user-avatar-small"
                    />
                    <span>{user.discordUsername}</span>
                  </div>
                </td>
                <td>{user.email || '—'}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user._count.bookings}</td>
                <td>{user._count.customProposals}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
                <td>
                  <button
                    onClick={() => router.push(`/admin/proposals/create?userId=${user.id}`)}
                    className="btn btn-primary btn-small"
                  >
                    Créer proposition
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <p>Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}