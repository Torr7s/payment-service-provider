import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/app/entities/user.entity';

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