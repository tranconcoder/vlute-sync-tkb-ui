export class EnvUtil {
  /**
   * Checks if an environment variable value is valid (exists and is not empty).
   */
  public static isValid(value: unknown): boolean {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    return true;
  }

  /**
   * Verifies that an environment variable value is valid, or throws an error.
   */
  public static verify(key: string, value: unknown): void {
    if (!this.isValid(value)) {
      throw new Error(
        `Environment configuration error: "${key}" is missing or contains an invalid value.`,
      );
    }
  }

  /**
   * Returns the value if valid, otherwise returns the default value.
   * Useful for Next.js where process.env.NEXT_PUBLIC_... must be written out fully.
   */
  public static getEnv(value: unknown, defaultValue: string = ""): string {
    return this.isValid(value) ? (value as string) : defaultValue;
  }
}
