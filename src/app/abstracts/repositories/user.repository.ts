import { UserWhereFilter } from '@/@types';

import { UserEntity } from '@/app/entities/user.entity';

export abstract class UserRepository {
  public abstract create: (data: UserEntity) => Promise<UserEntity>;
  public abstract findOne: (where: UserWhereFilter) => Promise<UserEntity>;
}