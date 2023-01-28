import { UserEntity } from '@/domain/entities/user.entity';
import { User } from '@prisma/client'

export interface IFindUserByEmailUseCase {
  exec: (email: string) => Promise<UserEntity>;
}