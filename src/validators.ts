type Error = { message: string }

export type ValidationResult =
  | { ok: true, errors: [] }
  | { ok: false, errors: Error[] | [] }

function isString(obj: any): obj is string {
  return typeof obj === "string";
}

function isNumber(obj: any): obj is number {
  return typeof obj === "number";
}

function isDate(obj: any): obj is Date {
  return Object.prototype.toString.call(obj) === "[object Date]";
}

function isNumberArray(obj: any): obj is number[] {
  if (Array.isArray(obj)) {
    var flag: boolean = false;
    obj.forEach(function (item) {
      if (!isNumber(item)) {
        flag = true;
      }
    })
    if (!flag && obj.length > 0) {
      return false;
    }

    return true;
  }

  return false;
}

const min = (min: number, actual: number) => actual >= min;
const max = (max: number, actual: number) => actual <= max;
const error: (msg: string) => Error = msg => ({
  message: msg
})

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
    : { ok: true, errors: []}
}
