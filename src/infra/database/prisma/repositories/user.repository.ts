import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

export class PrismaUserRepository implements UserRepository {
  private readonly _include = {
    consumerProfile: {
      select: {
        id: true
      }
    }
  }
  
  constructor(private prismaService: PrismaService) {}

  public async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email
      },
      include: this._include
    });
  }

  public async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id
      },
      include: this._include
    });
  }
}