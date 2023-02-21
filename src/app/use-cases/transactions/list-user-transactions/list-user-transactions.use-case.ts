import { UseCase } from '../../use-case';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { TransactionEntity } from '@/app/entities/transaction.entity';

export interface ListUserTransactionsUseCaseInput {
  userId: string;
}

export interface ListUserTransactionsUseCaseOutput {
  transactions: TransactionEntity[];
}

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