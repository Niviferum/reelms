import { prisma } from '@/lib/prisma'

export default async function TestPage() {
  const sessionTypes = await prisma.sessionType.findMany()
  const users = await prisma.user.findMany()
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      sessionType: true,
    }
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Test de la DB</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types de Sessions ({sessionTypes.length})</h2>
        <div className="space-y-2">
          {sessionTypes.map(st => (
            <div key={st.id} className="p-4 border rounded">
              <h3 className="font-bold">{st.name}</h3>
              <p className="text-sm text-gray-600">{st.description}</p>
              <p className="text-sm">Prix: {st.price / 100}€ | Durée: {st.duration}min</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Utilisateurs ({users.length})</h2>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="p-4 border rounded">
              <p className="font-bold">{user.discordUsername}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Réservations ({bookings.length})</h2>
        <div className="space-y-2">
          {bookings.map(booking => (
            <div key={booking.id} className="p-4 border rounded">
              <p><strong>User:</strong> {booking.user.discordUsername}</p>
              <p><strong>Session:</strong> {booking.sessionType.name}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Date:</strong> {booking.scheduledAt?.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}