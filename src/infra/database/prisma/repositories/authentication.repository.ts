import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { AuthenticationRepository } from '@/app/abstracts/repositories/authentication.repository';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

export class PrismaAuthenticationRepository implements AuthenticationRepository {
  constructor(private prismaService: PrismaService) {}

  public async signUp(signUpDto: SignUpDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...signUpDto
      }
    });
  }
} 