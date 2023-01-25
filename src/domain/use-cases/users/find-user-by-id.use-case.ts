import { User } from '@prisma/client'

export interface IFindUserByIdUseCase {
  exec: (id: string) => Promise<User>;
}