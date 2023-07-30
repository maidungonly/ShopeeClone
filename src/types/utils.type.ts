export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}

export type noUndefinedField<T> = {
  [P in keyof T]-?: noUndefinedField<NonNullable<T[P]>>
}
