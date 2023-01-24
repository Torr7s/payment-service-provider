import { Transaction } from '@prisma/client';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export namespace NSTransactionRepositoryCreate {
  export type Input = CreateTransactionDto;
  export type Output = Transaction;
}

export namespace NSTransactionRepositoryFindById {
  export type Input = {
    id: string;
  }
  export type Output = Transaction;
}

export namespace NSTransactionRepositoryList {
  export type Input = {
    consumerId: string;
  }
  export type Output = Transaction[];
}

export interface ITransactionRepository {
  create: (params: NSTransactionRepositoryCreate.Input) => Promise<NSTransactionRepositoryCreate.Output>;
  findById: ({ id }: NSTransactionRepositoryFindById.Input) => Promise<NSTransactionRepositoryFindById.Output>;
  list: ({ consumerId }: NSTransactionRepositoryList.Input) => Promise<NSTransactionRepositoryList.Output>;
}