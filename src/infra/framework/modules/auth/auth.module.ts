import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';

import { SessionSerializer } from './session.serializer';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { AuthUseCase } from '@/app/use-cases/auth/auth';
import { AuthSignInUseCase } from '@/app/use-cases/auth/sign-in';
import { AuthSignUpUseCase } from '@/app/use-cases/auth/sign-up';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { PrismaAuthRepository } from '@/infra/database/prisma/repositories/auth.repository';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: AuthRepository,
      useFactory: (prismaService: PrismaService): PrismaAuthRepository =>
        new PrismaAuthRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: UserRepository,
      useFactory: (prismaService: PrismaService): PrismaUserRepository =>
        new PrismaUserRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: AuthUseCase,
      useFactory: (userRepository: UserRepository): AuthUseCase => 
        new AuthUseCase(userRepository),
      inject: [UserRepository]
    },
    {
      provide: AuthSignInUseCase,
      useFactory: (userRepository: UserRepository): AuthSignInUseCase =>
        new AuthSignInUseCase(userRepository),
      inject: [UserRepository]
    },
    {
      provide: AuthSignUpUseCase,
      useFactory: (authRepository: AuthRepository, userRepository: UserRepository): AuthSignUpUseCase =>
        new AuthSignUpUseCase(
          authRepository, 
          userRepository
        ),
      inject: [AuthRepository, UserRepository]
    },
    LocalStrategy, JwtStrategy, SessionSerializer
  ]
})
export class AuthModule {}