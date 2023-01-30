import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';

import { UserEntity } from '@/domain/entities/user.entity';

export class AuthInMemoryRepository implements AuthRepository {
  private readonly users: Array<UserEntity>;

  constructor() {
    this.users = [];
  }

  public async signUp(data: UserEntity): Promise<UserEntity> {
    const element: number = this.users.push(data);

    return this.users[element - 1];
  }
}