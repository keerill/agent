interface User {
  firstName?: string | null
  lastName?: string | null
  middleName?: string | null
}

export const fullName = (user: User): string => {
  return [user.lastName, user.firstName, user.middleName]
    .filter(Boolean)
    .join(" ")
}
