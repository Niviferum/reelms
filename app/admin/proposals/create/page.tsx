import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import CreateProposalForm from './CreateProposalForm'
import '../../admin.css'

interface PageProps {
  searchParams: { userId?: string }
}

export default async function CreateProposalPage({ searchParams }: PageProps) {
  const session = await getSession()

  if (!session.isAuthenticated || !session.user) {
    redirect('/login')
  }

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (admin?.role !== 'ADMIN') {
    redirect('/')
  }

  const userId = searchParams.userId

  let targetUser = null
  if (userId) {
    targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        discordUsername: true,
        discordAvatar: true,
        email: true,
      },
    })
  }

  const users = await prisma.user.findMany({
    where: { role: 'USER' },
    select: {
      id: true,
      discordUsername: true,
      discordAvatar: true,
    },
    orderBy: { discordUsername: 'asc' },
  })

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>Créer une Proposition Personnalisée</h1>
          <a href="/admin/users" className="btn btn-secondary">← Retour</a>
        </header>

        <CreateProposalForm 
          users={users}
          preselectedUserId={targetUser?.id}
          preselectedUser={targetUser}
        />
      </div>
    </div>
  )
}