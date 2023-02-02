import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { UserEntity } from '@/domain/entities/user.entity';
import { Prisma } from '@prisma/client';

export class UserInMemoryRepository implements UserRepository {
  private readonly users: Array<UserEntity>;

  constructor() {
    this.users = [];
  }

  public async create(data: UserEntity): Promise<UserEntity> {
    const element = this.users.push(data);

    return this.users[element - 1];
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.users.find(user => 
      user.id === where.id || 
      user.email === where.email
    );
  }
}