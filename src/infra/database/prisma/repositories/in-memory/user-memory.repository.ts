import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { UserEntity } from '@/domain/entities/user.entity';

export class UserInMemoryRepository implements UserRepository {
  private readonly users: Array<UserEntity>;

  constructor() {
    this.users = [];
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.users.find(user => user.id === id);
  }
}