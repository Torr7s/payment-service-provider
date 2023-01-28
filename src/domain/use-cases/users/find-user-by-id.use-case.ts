import { UserEntity } from '@/domain/entities/user.entity';
import { User } from '@prisma/client'

export interface IFindUserByIdUseCase {
  exec: (id: string) => Promise<UserEntity>;
}