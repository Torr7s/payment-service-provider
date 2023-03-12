import { Injectable } from '@nestjs/common';

import { 
  Prisma,
  User as PrismaUser 
} from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { PrismaUserMapper } from '../mappers/user.mapper';

import { User } from '@/src/app/entities/user';
import { UserRepository } from '@/src/app/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: User): Promise<User> {
    const prismaUserData: PrismaUser = await this.prismaService.user.create({
      data: PrismaUserMapper.toPrisma(data)
    });

    const user: User = PrismaUserMapper.toDomain(prismaUserData);

    return user;
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const prismaUserData: PrismaUser = await this.prismaService.user.findUnique({ 
      where 
    });

    if (!prismaUserData) {
      return null;
    }

    const user = PrismaUserMapper.toDomain(prismaUserData);

    return user;
  }
}