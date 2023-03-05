import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { UserEntity } from '@/src/app/entities/user.entity';
import { UserRepository } from '@/src/app/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({ data });
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prismaService.user.findUnique({ where });
  }
}