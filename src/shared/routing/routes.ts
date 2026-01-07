export const ROUTES = {
  catalog: "/catalog",
  catalogItem: (id: string | number) => `/catalog/${id}`,

  auth: {
    signIn: "/auth/sign-in",
    resetPassword: (token: string) => `/auth/reset-password/${token}`,
  },
} as const
