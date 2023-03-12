import { UseCase } from '../../use-case';

import { Transaction } from '@/src/app/entities/transaction';
import { TransactionRepository } from '@/src/app/repositories/transaction.repository';

export interface ListUserTransactionsUseCaseInput {
  userId: string;
}

export interface ListUserTransactionsUseCaseOutput {
  transactions: Transaction[];
}

export class ListUserTransactionsUseCase implements
  UseCase<
    ListUserTransactionsUseCaseInput,
    ListUserTransactionsUseCaseOutput
  > {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async exec(input: ListUserTransactionsUseCaseInput): Promise<ListUserTransactionsUseCaseOutput> {
    const transactions: Transaction[] = await this.transactionRepository.listUserTransactions(input.userId);

    return {
      transactions
    }
  }
}