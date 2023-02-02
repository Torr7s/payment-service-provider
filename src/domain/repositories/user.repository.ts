import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create: (data: UserEntity) => Promise<UserEntity>;
}