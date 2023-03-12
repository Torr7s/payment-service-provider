import { Prisma } from '@prisma/client';

import { User } from '@/src/app/entities/user';
import { UserRepository } from '@/src/app/repositories/user.repository';

export class UserInMemoryRepository implements UserRepository {
  private readonly users: Array<User>;

  constructor() {
    this.users = [];
  }

  public async create(data: User): Promise<User> {
    const element = this.users.push(data);

    return this.users[element - 1];
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.users.find(user => 
      user.id === where.id || 
      user.email === where.email
    );
  }
}