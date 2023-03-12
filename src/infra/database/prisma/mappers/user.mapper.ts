import { User as PrismaUser } from '@prisma/client';

import { User } from '@/src/app/entities/user';

export class PrismaUserMapper {
  private constructor() {
    throw new Error(
      'PrismaUserMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  public static toDomain(user: PrismaUser): User {
    return new User({
      email: user.email,
      fullName: user.fullName,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }
}