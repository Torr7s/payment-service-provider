import { UserEntity } from '@/domain/entities/user.entity';

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthSignInOutput {
  user: UserEntity;
}