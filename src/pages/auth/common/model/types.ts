export interface SignInForm {
  email?: string
  phone?: string
  password: string
}

export type AuthTab = "email" | "phone"
