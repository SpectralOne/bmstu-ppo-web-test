export class BaseError extends Error {
  msg: string;
  constructor(msg: string) {
    super(msg);
    this.msg = msg;
  }
  
  exInfo() {
    return this.msg;
  }
}

export class LogicError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export class dbError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export class NotFoundError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}

export class PermissionError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}
