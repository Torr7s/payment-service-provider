import { Prisma } from '@prisma/client';

import { UserEntity } from '@/domain/entities/user.entity';

export interface FindUserUseCaseInput {
  where: Prisma.UserWhereUniqueInput;
}

export interface FindUserUseCaseOutput {
  user: UserEntity;
}