export class ServerNotInitializedError extends Error {
  constructor(message?: string) {
    super(message || 'Server has not been initialized');
    this.name = 'ServerNotInitializedError';
  }
}
