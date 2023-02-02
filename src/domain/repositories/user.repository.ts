import { Prisma } from '@prisma/client';

import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create: (data: UserEntity) => Promise<UserEntity>;
  findOne: (where: Prisma.UserWhereUniqueInput) => Promise<UserEntity>;
}