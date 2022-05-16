import { ValidationResult } from "../types/Validation";
import { Error } from "../types/Error";
import { isNumber, isString, error } from "./validatorUtil";

export const validateUser = (obj: any): ValidationResult => {
  const errors: Error[] = [];

  if (!isString(obj.login)) {
    errors.push(error(`user.login: string expected, got ${typeof obj.login}`));
  }

  if (!isString(obj.password)) {
    errors.push(error(`user.password: string expected, got ${typeof obj.password}`));
  }

  if (!isNumber(obj.privelegelevel)) {
    errors.push(error(`user.privelegelevel: number expected, got ${typeof obj.privelegelevel}`));
  }

  return errors.length
    ? { ok: false, errors: errors }
    : { ok: true, errors: [] }
}
