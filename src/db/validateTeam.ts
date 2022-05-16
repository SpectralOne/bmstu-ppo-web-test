import { ValidationResult } from "../types/Validation";
import { Error } from "../types/Error";
import { isNumber, isString, isDate, error } from "./validatorUtil";

export const validateTeam = (obj: any): ValidationResult => {
  const errors: Error[] = [];

  if (!isNumber(obj.owner)) {
    errors.push(error(`team.owner: number expected, got ${typeof obj.owner}`));
  }

  if (!isString(obj.name)) {
    errors.push(error(`team.name: string expected, got ${typeof obj.name}`));
  }

  if (!isString(obj.description)) {
    errors.push(error(`team.description: string expected, got ${typeof obj.description}`));
  }

  return errors.length
    ? { ok: false, errors: errors }
    : { ok: true, errors: [] }
}
