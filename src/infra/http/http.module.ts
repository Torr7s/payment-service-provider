import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DatabaseModule } from '../database/database.module';

import { LocalStrategy } from './core/auth/strategies/local.strategy';
import { JwtStrategy } from './core/auth/strategies/jwt.strategy';
import { SessionSerializer } from './core/auth/session/session.serializer';

import { AuthController } from './controllers/auth.controller';
import { PayableController } from './controllers/payable.controller';
import { TransactionController } from './controllers/transaction.controller';

import { AuthSignInUseCase } from '@/app/use-cases/auth/sign-in';
import { AuthSignUpUseCase } from '@/app/use-cases/auth/sign-up';
import { CreatePayableUseCase } from '@/app/use-cases/payables/create-payable';
import { ListUserPayablesUseCase } from '@/app/use-cases/payables/list-user-payables';
import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListUserTransactionsUseCase } from '@/app/use-cases/transactions/list-user-transactions';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true
    }),
    DatabaseModule
  ],
  controllers: [
    AuthController,
    PayableController,
    TransactionController
  ],
  providers: [
    {
      provide: AuthSignInUseCase,
      useFactory: (userRepo: UserRepository): AuthSignInUseCase =>
        new AuthSignInUseCase(userRepo),
      inject: [UserRepository]
    },
    {
      provide: AuthSignUpUseCase,
      useFactory: (userRepo: UserRepository): AuthSignUpUseCase =>
        new AuthSignUpUseCase(userRepo),
      inject: [UserRepository]
    },
    {
      provide: ListUserPayablesUseCase,
      useFactory: (payableRepository: PayableRepository): ListUserPayablesUseCase =>
        new ListUserPayablesUseCase(payableRepository),
      inject: [PayableRepository]
    },
    {
      provide: CreatePayableUseCase,
      useFactory: (payableRepository: PayableRepository): CreatePayableUseCase =>
        new CreatePayableUseCase(payableRepository),
      inject: [PayableRepository]
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (createPayableUseCase: CreatePayableUseCase, transactionRepository: TransactionRepository): CreateTransactionUseCase =>
        new CreateTransactionUseCase(
          createPayableUseCase,
          transactionRepository
        ),
      inject: [CreatePayableUseCase, TransactionRepository]
    },
    {
      provide: ListUserTransactionsUseCase,
      useFactory: (transactionRepository: TransactionRepository): ListUserTransactionsUseCase =>
        new ListUserTransactionsUseCase(transactionRepository),
      inject: [TransactionRepository]
    },
    LocalStrategy,
    JwtStrategy,
    SessionSerializer
  ]
})
export class HttpModule {}