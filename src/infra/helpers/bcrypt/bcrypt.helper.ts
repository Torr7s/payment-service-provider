import bcrypt from 'bcrypt';

export const compareStrings = (data: string, encrypted: string): boolean => bcrypt.compareSync(data, encrypted);

export const hashString = (data: string): Promise<string> => bcrypt.hash(data, 9);