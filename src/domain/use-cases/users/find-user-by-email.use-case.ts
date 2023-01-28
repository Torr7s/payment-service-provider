import { UserEntity } from '@/domain/entities/user.entity';

export interface IFindUserByEmailUseCase {
  exec: (email: string) => Promise<UserEntity>;
}