import { UserEntity } from '@/domain/entities/user.entity';

export interface FindUserByEmailUseCaseInput {
  email: string;
}

export interface FindUserByEmailUseCaseOutput {
  user: UserEntity;
}