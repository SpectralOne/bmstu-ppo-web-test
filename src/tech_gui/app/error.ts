import { BaseError } from "../../logic/error";

export class AppError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}
