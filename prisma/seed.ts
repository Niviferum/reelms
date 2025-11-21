import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  const sessionTypes = await prisma.sessionType.createMany({
    data: [
      {
        name: 'Session Découverte',
        slug: 'session-decouverte',
        description: 'Une session d\'introduction parfaite pour les débutants. Découvrez l\'univers fantasy épique et créez votre premier personnage. Durée : 2 heures.',
        duration: 120,
        price: 2000,
        maxPlayers: 6,
        imageUrl: '/images/sessions/decouverte.jpg',
        active: true,
      },
      {
        name: 'Aventure One-Shot',
        slug: 'aventure-one-shot',
        description: 'Une aventure complète en une seule session. Plongez dans une quête palpitante avec son début, son développement et sa conclusion. Durée : 3 heures.',
        duration: 180,
        price: 3000,
        maxPlayers: 5,
        imageUrl: '/images/sessions/oneshot.jpg',
        active: true,
      },
      {
        name: 'Campagne Épique',
        slug: 'campagne-epique',
        description: 'Une campagne sur plusieurs sessions pour les joueurs expérimentés. Développez votre personnage et vivez une histoire épique qui s\'étend sur plusieurs semaines. Durée : 4 heures par session.',
        duration: 240,
        price: 4500,
        maxPlayers: 4,
        imageUrl: '/images/sessions/campagne.jpg',
        active: true,
      },
      {
        name: 'Session Privée',
        slug: 'session-privee',
        description: 'Une session personnalisée uniquement pour votre groupe. Scénario sur-mesure, horaires flexibles. Parfait pour les anniversaires ou événements spéciaux. Durée : 3 heures.',
        duration: 180,
        price: 5000,
        maxPlayers: 8,
        imageUrl: '/images/sessions/privee.jpg',
        active: true,
      },
    ],
  })

  console.log(`✅ ${sessionTypes.count} types de session créés`)

  const adminUser = await prisma.user.create({
    data: {
      discordId: '123456789012345678',
      discordUsername: 'MasterGM',
      discordAvatar: 'avatar_hash',
      email: 'admin@fantasy-rp.com',
      role: 'ADMIN',
    },
  })

  console.log(`✅ Utilisateur admin créé : ${adminUser.discordUsername}`)

  const testUser = await prisma.user.create({
    data: {
      discordId: '987654321098765432',
      discordUsername: 'TestPlayer',
      discordAvatar: 'test_avatar',
      email: 'player@example.com',
      role: 'USER',
    },
  })

  console.log(`✅ Utilisateur test créé : ${testUser.discordUsername}`)

  const sessionType = await prisma.sessionType.findFirst({
    where: { slug: 'session-decouverte' },
  })

  if (sessionType) {
    const testBooking = await prisma.booking.create({
      data: {
        userId: testUser.id,
        sessionTypeId: sessionType.id,
        status: 'CONFIRMED',
        scheduledAt: new Date('2025-12-01T19:00:00Z'),
        playerCount: 1,
        notes: 'Première session, très excité !',
      },
    })

    console.log(`✅ Booking test créé : ${testBooking.id}`)
  }

  console.log('🎉 Seeding terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur durant le seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })