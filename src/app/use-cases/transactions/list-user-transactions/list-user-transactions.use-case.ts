import { UseCase } from '../../use-case';

import { TransactionEntity } from '@/src/app/entities/transaction.entity';
import { TransactionRepository } from '@/src/app/repositories/transaction.repository';

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