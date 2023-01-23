import bcrypt from 'bcrypt';

export const compareStrings = async (data: string, encrypted: string): Promise<boolean> => await bcrypt.compare(data, encrypted);

export const hashString = async (data: string): Promise<string> => await bcrypt.hash(data, 9);