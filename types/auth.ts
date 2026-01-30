export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  email?: string | null
  verified?: boolean
  locale?: string
  mfa_enabled?: boolean
  premium_type?: number
  public_flags?: number
}

export interface DiscordGuild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  features: string[]
}

export interface DiscordTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface AuthSession {
  user?: {
    id: string
    discordId: string
    discordUsername: string
    discordAvatar: string | null
    email: string | null
    role: string
  }
  isAuthenticated: boolean
}