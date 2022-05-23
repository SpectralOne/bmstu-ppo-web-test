import { BaseError } from "../../logic/error";

export class AppError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export const isAppError = (err: any) => {
  return err instanceof AppError;
}
