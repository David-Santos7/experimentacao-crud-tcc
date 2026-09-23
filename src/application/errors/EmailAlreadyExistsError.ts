export class EmailAlreadyExistsError extends Error {
    constructor() {
        super("User email already exists.");
        this.name = "EmailAlreadyExistsError";
  }
}