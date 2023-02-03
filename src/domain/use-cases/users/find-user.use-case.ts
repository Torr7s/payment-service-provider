import { UserWhereFilter } from '@/@types';

import { UserEntity } from '@/domain/entities/user.entity';

export interface FindUserUseCaseInput {
  where: UserWhereFilter;
}

export interface FindUserUseCaseOutput {
  user: UserEntity;
}