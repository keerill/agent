export interface Permission {
  module: string
  operation: "read" | "update" | "create" | "delete"
}
