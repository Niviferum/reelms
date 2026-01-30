import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Supprimer les anciennes données (dev only)
  await prisma.booking.deleteMany()
  await prisma.sessionType.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Anciennes données supprimées')

  // Créer les types de session avec les vrais tarifs
  const sessionTypes = await prisma.sessionType.createMany({
    data: [
      {
        name: 'Oneshot',
        slug: 'oneshot',
        description: 'Une session unique qui dure entre 3 et 4 heures et qui réunit différents personnages préconstruits vivant une histoire écrite. Plusieurs aventures différentes sont à disposition. Idéal pour les joueurs avec peu de disponibilités.',
        duration: 210, // 3h30 en moyenne
        priceMin: 2000, // 20€
        priceMax: 2000, // 20€
        stripePriceId: process.env.STRIPE_PRICE_ONESHOT || null,
        maxPlayers: 6,
        imageUrl: null,
        active: true,
      },
      {
        name: 'Scénario',
        slug: 'scenario',
        description: 'Entre 3 et 5 sessions qui durent 3 heures chacune. Vous incarnerez des personnages préconstruits ou de votre création en fonction du scénario proposé. Plusieurs aventures différentes sont réalisables, toutes abordant des thèmes uniques. Idéal pour les joueurs avec de bonnes disponibilités cherchant à découvrir l\'expérience Reelms dans les meilleures conditions.',
        duration: 180, // 3h par session
        priceMin: 5000, // 50€
        priceMax: 8000, // 80€
        stripePriceId: null, // Prix variable
        maxPlayers: 6,
        imageUrl: null,
        active: true,
      },
      {
        name: 'Coaching',
        slug: 'coaching',
        description: 'Une à deux sessions à durée variable avec pour objectif de vous transmettre de précieux conseils pour améliorer vos compétences de joueurs ou de maitre du jeu. Que ce soit vis à vis de votre roleplay, de vos décisions, de votre compréhension du jeu, de vos préparatifs, je propose plusieurs accompagnements. Idéal pour les joueurs passionnés cherchant à nettement améliorer leurs compétences.',
        duration: 120, // Variable, moyenne 2h
        priceMin: 5000, // 50€
        priceMax: 20000, // 200€
        stripePriceId: null, // Prix variable
        maxPlayers: 6,
        imageUrl: null,
        active: true,
      },
      {
        name: 'Commande Personnalisée',
        slug: 'commande-personnalisee',
        description: 'Une session de jeu entièrement personnalisable en fonction de vos envies. Le prix est à la session et non plus individuel. Idéal pour les groupes ne souhaitant pas d\'inconnus à leur table ou pour des gourmands voulant gouter à une campagne unique !',
        duration: 180, // Variable
        priceMin: 6000, // 60€
        priceMax: 50000, // 500€
        stripePriceId: null, // Prix variable selon demande
        maxPlayers: 12, // Groupe complet possible
        imageUrl: null,
        active: true,
      },
    ],
  })

  console.log(`✅ ${sessionTypes.count} types de session créés`)

  // Créer un utilisateur admin
  const adminUser = await prisma.user.create({
    data: {
      discordId: '123456789012345678',
      discordUsername: 'AdminReelms',
      discordAvatar: null,
      email: 'admin@reelms.com',
      role: 'ADMIN',
    },
  })

  console.log(`✅ Utilisateur admin créé : ${adminUser.discordUsername}`)

  // Créer un utilisateur test
  const testUser = await prisma.user.create({
    data: {
      discordId: '987654321098765432',
      discordUsername: 'TestPlayer',
      discordAvatar: null,
      email: 'test@example.com',
      role: 'USER',
    },
  })

  console.log(`✅ Utilisateur test créé : ${testUser.discordUsername}`)

  // Créer une réservation test
  const oneshotSession = await prisma.sessionType.findFirst({
    where: { slug: 'oneshot' },
  })

  if (oneshotSession) {
    const testBooking = await prisma.booking.create({
      data: {
        userId: testUser.id,
        sessionTypeId: oneshotSession.id,
        status: 'CONFIRMED',
        scheduledAt: new Date('2025-12-15T19:00:00Z'),
        playerCount: 1,
        notes: 'Première session test !',
      },
    })

    console.log(`✅ Booking test créé : ${testBooking.id}`)
  }

  console.log('\n🎉 Seeding terminé avec succès !')
  console.log('\n📊 Résumé :')
  console.log('  - 4 types de session créés')
  console.log('  - 2 utilisateurs créés (1 admin, 1 user)')
  console.log('  - 1 réservation test créée')
  console.log('\n💡 Lance `npx prisma studio` pour voir les données !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur durant le seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })