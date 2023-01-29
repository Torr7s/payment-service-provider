import { UserEntity } from '@/domain/entities/user.entity';

export interface IAuthSignInRequest {
  email: string;
  password: string;
}

export interface IAuthSignInUseCase {
  exec: (input: IAuthSignInRequest) => Promise<UserEntity>;
}