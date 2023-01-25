import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  public async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

  public async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    });
  }
}