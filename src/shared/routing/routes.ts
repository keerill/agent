export const ROUTES = {
  // Главные
  home: "/",
  catalog: "/catalog",

  // Основные активности
  merchantManagerCustomers: "/merchant-manager-customers",
  agentCustomers: (agentId: string) => `/agent/${agentId}/customer`,
  agentsCustomers: "/agents-customers",
  corporateCustomers: "/corporate-customers",
  salesManagerCustomers: "/sales-manager-customers",
  mortgageManagerCustomers: "/mortgage-manager-customers",
  merchantsCustomers: "/merchants-customers",
  agencies: "/agencies",
  agency: (agencyId: string) => `/agency/${agencyId}`,
  branch: (agencyId: string, branchId: string) =>
    `/agency/${agencyId}/branch/${branchId}`,
  calendar: "/calendar",
  reports: "/reports",

  // Ипотека
  mortgage: {
    calculator: "/mortgage-calculator",
    installments: {
      main: "/installments",
      calculator: "/installments-calculator",
    },
    refs: {
      exceptions: "/mortgage-exceptions",
      limits: "/mortgage-limits",
      ranges: "/mortgage-ranges",
      tariffs: "/mortgage-tariffs",
    },
  },

  // Маркетинг
  marketing: {
    main: "/marketing",
    education: "/marketing/education",
    tariffs: "/marketing/tariffs",
  },

  // Мерчант
  merchantSettings: "/merchant-settings",

  // Авторизация
  auth: {
    signIn: "/auth/sign-in",
    offerAcceptance: "/auth/offer-acceptance",
    passwordReset: "/auth/password-reset",
  },

  featureFlags: "/feature-flags",

  notFound: "/not-found",
} as const
