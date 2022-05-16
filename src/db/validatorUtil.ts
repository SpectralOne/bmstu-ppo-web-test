import { Error } from "../types/Error";

export const isString = (obj: any): obj is string => {
  return typeof obj === "string";
}

export const isNumber = (obj: any): obj is number => {
  return typeof obj === "number";
}

export const isDate = (obj: any): obj is Date => {
  return Object.prototype.toString.call(obj) === "[object Date]";
}

export const isNumberArray = (obj: any): obj is number[] => {
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

export const min = (min: number, actual: number) => actual >= min;
export const max = (max: number, actual: number) => actual <= max;
export const error: (msg: string) => Error = msg => ({
  message: msg
})
