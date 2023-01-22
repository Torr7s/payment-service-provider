import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export namespace TransactionRepositoryCreateNS {
  export type Input = CreateTransactionDto;
  export type Output = Transaction;
}

export namespace TransactionRepositoryFindByIdNS {
  export type Input = {
    id: string;
  }
  export type Output = Transaction;
}

export interface TransactionRepositoryInterface {
  create: (params: TransactionRepositoryCreateNS.Input) => Promise<TransactionRepositoryCreateNS.Output>;
  findById: ({ id }: TransactionRepositoryFindByIdNS.Input) => Promise<TransactionRepositoryFindByIdNS.Output>;
}