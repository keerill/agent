export const ROUTES = {
  catalog: "/catalog",
  catalogItem: (id: string | number) => `/catalog/${id}`,

  auth: {
    signIn: "/auth/sign-in",
    resetPassword: "/auth/reset-password",
    offerAcceptance: "/auth/offer-acceptance",
  },

  notFound: "/not-found",
} as const
