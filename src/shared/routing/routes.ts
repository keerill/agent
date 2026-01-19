export const ROUTES = {
  catalog: "/catalog",
  catalogItem: (id: string | number) => `/catalog/${id}`,

  auth: {
    signIn: "/auth/sign-in",
    offerAcceptance: "/auth/offer-acceptance",
    passwordReset: "/auth/password-reset",
  },

  featureFlags: "/feature-flags",

  notFound: "/not-found",
} as const
