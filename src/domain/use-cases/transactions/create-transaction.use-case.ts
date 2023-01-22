import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export namespace CreateTransactionUseCaseNS {
  export type Input = CreateTransactionDto;
  export type Output = Transaction;
}

export interface CreateTransactionUseCaseInterface {
  execute: (params: CreateTransactionUseCaseNS.Input) => Promise<CreateTransactionUseCaseNS.Output>;
}