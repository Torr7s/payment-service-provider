import { TransactionRepository } from '@/src/app/repositories/transaction.repository';

import { TransactionEntity } from '@/src/app/entities/transaction.entity';

export class TransactionInMemoryRepository implements TransactionRepository {
  private readonly transactions: Array<TransactionEntity>;

  constructor() {
    this.transactions = [];
  }

  public async create(data: TransactionEntity): Promise<TransactionEntity> {
    const element = this.transactions.push(data);

    return this.transactions[element - 1];
  }

  public async findById(id: string): Promise<TransactionEntity> {
    return this.transactions.find(transaction => transaction.id === id);
  }

  public async listUserTransactions(userId: string): Promise<Array<TransactionEntity>> {
    return this.transactions.filter(transaction => transaction.userId === userId);
  }
}