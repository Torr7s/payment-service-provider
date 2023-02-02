import { UseCase } from '../../use-case';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { ListUserTransactionsUseCaseInput, ListUserTransactionsUseCaseOutput } from '@/domain/use-cases/transactions';

export class ListUserTransactionsUseCase implements
  UseCase<
    ListUserTransactionsUseCaseInput,
    ListUserTransactionsUseCaseOutput
  > {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async exec(input: ListUserTransactionsUseCaseInput): Promise<ListUserTransactionsUseCaseOutput> {
    const transactions: TransactionEntity[] = await this.transactionRepository.listUserTransactions(input.userId);

    return {
      transactions
    }
  }
}