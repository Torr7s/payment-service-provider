import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({ data });
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prismaService.user.findUnique({ where });
  }
}