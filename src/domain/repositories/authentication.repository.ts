import { UserEntity } from '../entities/user.entity';

export interface IAuthenticationRepository {
  signUp: (data: UserEntity) => Promise<UserEntity>;
}