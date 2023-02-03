import { UserEntity } from '../entities/user.entity';

import { UserWhereFilter } from '@/@types';

export interface IUserRepository {
  create: (data: UserEntity) => Promise<UserEntity>;
  findOne: (where: UserWhereFilter) => Promise<UserEntity>;
}