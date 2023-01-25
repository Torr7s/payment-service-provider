import { User } from '@prisma/client';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User>;
  findById: (id: string) => Promise<User>;
}