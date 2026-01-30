import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import ProposalsList from './ProposalsList'
import '../admin.css'

export default async function AdminProposalsPage() {
  const session = await getSession()

  if (!session.isAuthenticated || !session.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (user?.role !== 'ADMIN') {
    redirect('/')
  }

  const proposals = await prisma.customSessionProposal.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          discordUsername: true,
          discordAvatar: true,
          discordId: true,
          email: true,
        },
      },
      booking: {
        select: {
          id: true,
          status: true,
          scheduledAt: true,
        },
      },
    },
  })

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <div>
            <h1>Propositions Personnalisées</h1>
            <p>Gestion des offres sur-mesure</p>
          </div>
          <a href="/admin" className="btn btn-secondary">← Retour au dashboard</a>
        </header>

        <ProposalsList proposals={proposals} />
      </div>
    </div>
  )
}