import { UserEntity } from '@/domain/entities/user.entity';

export interface AuthSignUpInput {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthSignUpOutput {
  user: UserEntity;
}