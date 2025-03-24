export class HTTPError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
