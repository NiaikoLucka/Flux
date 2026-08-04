export class AppError extends Error {
  public readonly status: number;

  constructor(message: string, status = 500) {
    super(message);

    this.name = "AppError";
    this.status = status;

    // Corrige la chaîne de prototypes
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
