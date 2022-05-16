import { Error } from "./Error"

export type ValidationResult =
  | { ok: true, errors: [] }
  | { ok: false, errors: Error[] | [] }
