import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create: (data: UserEntity) => Promise<UserEntity>;
  findByEmail: (email: string) => Promise<UserEntity>;
  findById: (id: string) => Promise<UserEntity>;
}