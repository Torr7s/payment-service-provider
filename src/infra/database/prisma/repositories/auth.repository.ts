import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prismaService: PrismaService) {}

  public async signUp(signUpDto: SignUpDto): Promise<User> {
    const user: User = await this.prismaService.user.create({
      data: signUpDto,
    });

    await this.prismaService.consumer.create({
      data: {
        userProfile: {
          connect: {
            id: user.id
          }
        }
      }
    });

    return user;
  }
} 