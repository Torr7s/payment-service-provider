import { User } from '@prisma/client'

export interface IFindUserByEmailUseCase {
  exec: (email: string) => Promise<User>;
}