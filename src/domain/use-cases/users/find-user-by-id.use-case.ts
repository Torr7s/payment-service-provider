import { UserEntity } from '@/domain/entities/user.entity';

export interface IFindUserByIdUseCase {
  exec: (id: string) => Promise<UserEntity>;
}