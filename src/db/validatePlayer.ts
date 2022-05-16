import { ValidationResult } from "../types/Validation";
import { Error } from "../types/Error";
import { isNumber, isString, isDate, error } from "./validatorUtil";

export const validatePlayer = (obj: any): ValidationResult => {
  const errors: Error[] = [];

  if (!isNumber(obj.owner)) {
    errors.push(error(`player.owner: number expected, got ${typeof obj.owner}`));
  }

  if (!isString(obj.firstname)) {
    errors.push(error(`player.firstname: string expected, got ${typeof obj.firstname}`));
  }

  if (!isString(obj.lastname)) {
    errors.push(error(`player.lastname: string expected, got ${typeof obj.lastname}`));
  }

  if (!isString(obj.country)) {
    errors.push(error(`player.country: string expected, got ${typeof obj.country}`));
  }

  if (!isDate(obj.birthdate)) {
    errors.push(error(`player.birthdate: Date expected, got ${typeof obj.birthdate}`));
  }

  return errors.length
    ? { ok: false, errors: errors }
    : { ok: true, errors: [] }
}