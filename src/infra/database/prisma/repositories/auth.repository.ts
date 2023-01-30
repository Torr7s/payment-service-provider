import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';

import { UserEntity } from '@/domain/entities/user.entity';

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prismaService: PrismaService) {}

  public async signUp(data: UserEntity): Promise<UserEntity> {
    const user: User = await this.prismaService.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: data.password
      }
    });

    return user;
  }
} 