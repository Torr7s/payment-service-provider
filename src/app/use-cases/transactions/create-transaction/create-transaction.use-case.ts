import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { ICreateTransactionUseCase, NSCreateTransactionUseCase } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async execute(params: NSCreateTransactionUseCase.Input): Promise<NSCreateTransactionUseCase.Output> {
    return this.repository.create({
      ...params,
      cardNumber: params.cardNumber.slice(-4)
    });
  };
}