import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export namespace NSCreateTransactionUseCase {
  export type Input = CreateTransactionDto;
  export type Output = Transaction;
}

export interface ICreateTransactionUseCase {
  execute: (params: NSCreateTransactionUseCase.Input) => Promise<NSCreateTransactionUseCase.Output>;
}