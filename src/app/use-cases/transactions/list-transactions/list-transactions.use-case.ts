import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { IListTransactionsUseCase, NSListTransactionsUseCase } from '@/domain/use-cases/transactions/list-transactions.use-case';

export class ListTransactionsUseCase implements IListTransactionsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async execute({ consumerId }: NSListTransactionsUseCase.Input): Promise<NSListTransactionsUseCase.Output> {
    return this.repository.list({ consumerId });
  }
}