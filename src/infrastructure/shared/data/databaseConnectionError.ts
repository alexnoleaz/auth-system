export class DatabaseConnectionError extends Error {
  constructor(message?: string) {
    super(message ?? 'Database connection not established.');
  }
}
