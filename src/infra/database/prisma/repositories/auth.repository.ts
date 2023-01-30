import { PrismaService } from '../prisma.service';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';

import { UserEntity } from '@/domain/entities/user.entity';

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prismaService: PrismaService) {}

  public async signUp(data: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({ data });;
  }
} 