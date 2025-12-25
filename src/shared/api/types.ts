export interface HttpRequestOptions extends Omit<RequestInit, "body"> {
  body?: RequestInit["body"] | object
  retry?: {
    count: number
    delay?: number
  }
  timeout?: number
}

export interface ApiError extends Error {
  statusCode: number
  message: string
}

export type ApiResponse<T> = {
  data: T | null
  status: number
  error?: string
}
