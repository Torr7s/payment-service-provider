import { UserEntity } from '@/domain/entities/user.entity';

export interface IAuthSignUpRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface IAuthSignUpUseCase {
  exec: (input: IAuthSignUpRequest) => Promise<UserEntity>;
}