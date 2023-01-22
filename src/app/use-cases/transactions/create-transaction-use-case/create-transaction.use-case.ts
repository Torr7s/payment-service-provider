import { TransactionRepository } from '@/app/repositories/transaction.repository';

import { CreateTransactionUseCaseInterface, CreateTransactionUseCaseNS } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements CreateTransactionUseCaseInterface {
  constructor(private readonly repository: TransactionRepository) {}

  public async execute(params: CreateTransactionUseCaseNS.Input): Promise<CreateTransactionUseCaseNS.Output> {
    return this.repository.create({
      ...params,
      cardNumber: params.cardNumber.slice(-4)
    });
  };
}