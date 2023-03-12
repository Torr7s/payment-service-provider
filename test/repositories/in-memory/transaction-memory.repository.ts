import { Transaction } from '@/src/app/entities/transaction';
import { TransactionRepository } from '@/src/app/repositories/transaction.repository';

export class TransactionInMemoryRepository implements TransactionRepository {
  private readonly transactions: Array<Transaction>;

  constructor() {
    this.transactions = [];
  }

  public async create(data: Transaction): Promise<Transaction> {
    const element = this.transactions.push(data);

    return this.transactions[element - 1];
  }

  public async findById(id: string): Promise<Transaction> {
    return this.transactions.find(transaction => transaction.id === id);
  }

  public async listUserTransactions(userId: string): Promise<Array<Transaction>> {
    return this.transactions.filter(transaction => transaction.userId === userId);
  }
}