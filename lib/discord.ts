import { DiscordUser, DiscordGuild, DiscordTokenResponse } from '@/types/auth'

const DISCORD_API_BASE = 'https://discord.com/api/v10'

export class DiscordAPI {
  static getOAuthURL(): string {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      response_type: 'code',
      scope: 'identify email guilds',
    })

    return `https://discord.com/api/oauth2/authorize?${params.toString()}`
  }

  static async exchangeCode(code: string): Promise<DiscordTokenResponse> {
    const response = await fetch(`${DISCORD_API_BASE}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    return response.json()
  }

  static async getUser(accessToken: string): Promise<DiscordUser> {
    const response = await fetch(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    return response.json()
  }

  static async getUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
    const response = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch guilds')
    }

    return response.json()
  }

  static isUserInGuild(guilds: DiscordGuild[], guildId: string): boolean {
    return guilds.some((guild) => guild.id === guildId)
  }
}