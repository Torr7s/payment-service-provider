import { Transaction } from '@prisma/client';

export namespace NSListTransactionsUseCase {
  export type Input = {
    consumerId: string;
  }
  export type Output = Transaction[];
}

export interface IListTransactionsUseCase {
  execute: ({ consumerId }: NSListTransactionsUseCase.Input) => Promise<NSListTransactionsUseCase.Output>;
}