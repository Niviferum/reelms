import { NextRequest, NextResponse } from 'next/server'
import { DiscordAPI } from '@/lib/discord'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=access_denied`
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=missing_code`
    )
  }

  try {
    // Échanger le code contre un access token
    const tokenResponse = await DiscordAPI.exchangeCode(code)

    // Récupérer les infos utilisateur
    const discordUser = await DiscordAPI.getUser(tokenResponse.access_token)

    // Récupérer les serveurs de l'utilisateur
    const guilds = await DiscordAPI.getUserGuilds(tokenResponse.access_token)

    // Vérifier que l'utilisateur est membre du serveur requis
    const guildId = process.env.DISCORD_GUILD_ID!
    const isMember = DiscordAPI.isUserInGuild(guilds, guildId)

    if (!isMember) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/?error=not_in_server&guild_id=${guildId}`
      )
    }

    // Créer ou mettre à jour l'utilisateur dans la base
    const user = await prisma.user.upsert({
      where: { discordId: discordUser.id },
      update: {
        discordUsername: discordUser.username,
        discordAvatar: discordUser.avatar,
        email: discordUser.email,
      },
      create: {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
        discordAvatar: discordUser.avatar,
        email: discordUser.email,
        role: 'USER',
      },
    })

    // Créer la session
    const session = await getSession()
    session.user = {
      id: user.id,
      discordId: user.discordId,
      discordUsername: user.discordUsername,
      discordAvatar: user.discordAvatar,
      email: user.email,
      role: user.role,
    }
    session.isAuthenticated = true
    await session.save()

    // Rediriger vers le dashboard
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
  } catch (error) {
    console.error('Error in Discord callback:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`
    )
  }
}