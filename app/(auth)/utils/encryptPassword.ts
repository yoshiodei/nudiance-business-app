import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns The hashed password as a Promise<string>.
 */

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
