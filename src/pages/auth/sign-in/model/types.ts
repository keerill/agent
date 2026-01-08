export interface SignInForm {
  email?: string
  phone?: string
  password: string
}

export type SignInTab = "email" | "phone"

export interface TelegramUser {
  id: number
  first_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}
