export const ROUTES = {
  catalog: "/catalog",
  catalogItem: (id: string | number) => `/catalog/${id}`,

  auth: {
    signIn: "/auth/sign-in",
    resetPassword: "/auth/reset-password",
  },

  notFound: "/not-found",
} as const
