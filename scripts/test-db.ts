import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabase() {
  console.log('🔍 Test de connexion à la base de données...\n')

  try {
    // Test 1: Connexion
    await prisma.$connect()
    console.log('✅ Connexion réussie!')

    // Test 2: Compter les utilisateurs
    const userCount = await prisma.user.count()
    console.log(`✅ Utilisateurs dans la DB: ${userCount}`)

    // Test 3: Compter les types de session
    const sessionTypeCount = await prisma.sessionType.count()
    console.log(`✅ Types de session: ${sessionTypeCount}`)

    // Test 4: Compter les réservations
    const bookingCount = await prisma.booking.count()
    console.log(`✅ Réservations: ${bookingCount}`)

    // Test 5: Récupérer un utilisateur avec ses relations
    const userWithBookings = await prisma.user.findFirst({
      include: {
        bookings: {
          include: {
            sessionType: true,
          },
        },
      },
    })

    if (userWithBookings) {
      console.log(`\n📊 Exemple d'utilisateur:`)
      console.log(`   - Username: ${userWithBookings.discordUsername}`)
      console.log(`   - Role: ${userWithBookings.role}`)
      console.log(`   - Bookings: ${userWithBookings.bookings.length}`)
    }

    // Test 6: Vérifier les index
    const result = await prisma.$queryRaw`
      SELECT tablename, indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public'
      ORDER BY tablename, indexname;
    `
    console.log(`\n✅ Index créés: ${Array.isArray(result) ? result.length : 0}`)

    console.log('\n🎉 Tous les tests sont passés! La base de données fonctionne parfaitement.\n')
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()