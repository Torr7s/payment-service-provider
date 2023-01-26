import { Provider } from '@nestjs/common';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { AuthSignInUseCase } from '@/app/use-cases/auth/sign-in';
import { AuthSignUpUseCase } from '@/app/use-cases/auth/sign-up';
import { FindUserByEmailUseCase } from '@/app/use-cases/users/find-user-by-email';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { PrismaAuthRepository } from '@/infra/database/prisma/repositories/auth.repository';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository';

export const AppModuleProviders: Provider[] = [
  PrismaService,
  {
    provide: AuthRepository,
    useFactory: (prismaService: PrismaService): PrismaAuthRepository => new PrismaAuthRepository(prismaService),
    inject: [PrismaService]
  },
  {
    provide: UserRepository,
    useFactory: (prismaService: PrismaService): PrismaUserRepository => new PrismaUserRepository(prismaService),
    inject: [PrismaService]
  },
  {
    provide: FindUserByEmailUseCase,
    useFactory: (userRepository: UserRepository): FindUserByEmailUseCase => new FindUserByEmailUseCase(userRepository),
    inject: [UserRepository]
  },
  {
    provide: AuthSignInUseCase,
    useFactory: (userRepository: UserRepository): AuthSignInUseCase => new AuthSignInUseCase(userRepository),
    inject: [FindUserByEmailUseCase]
  },
  {
    provide: AuthSignUpUseCase,
    useFactory: (authRepository: AuthRepository, userRepository: UserRepository): AuthSignUpUseCase => {
      return new AuthSignUpUseCase(
        authRepository, 
        userRepository
      );
    },
    inject: [AuthRepository, UserRepository]
  }
];