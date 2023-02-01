import { PrismaService } from '../prisma.service';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({ data });
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    });
  }
}