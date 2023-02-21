import bcrypt from 'bcrypt';

export class BcryptHelper {
  public static compareStrings(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  public static async hashString(data: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();

    return bcrypt.hash(data, salt);
  }
}