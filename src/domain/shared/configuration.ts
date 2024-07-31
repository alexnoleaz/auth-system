export interface Configuration {
  get<T>(value: string): T;
  has(value: string): boolean;
}
