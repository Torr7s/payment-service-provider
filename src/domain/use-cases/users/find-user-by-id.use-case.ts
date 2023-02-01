import { UserEntity } from '@/domain/entities/user.entity';

export interface FindUserByIdUseCaseInput {
  id: string;
}

export interface FindUserByIdUseCaseOutput {
  user: UserEntity;
}