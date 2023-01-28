import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<UserEntity>;
  findById: (id: string) => Promise<UserEntity>;
}