import { BadRequestException } from '@nestjs/common';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { ICreateTransactionUseCase, NSCreateTransactionUseCase } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async execute(params: NSCreateTransactionUseCase.Input): Promise<NSCreateTransactionUseCase.Output> {
    const validPaymentMethods: string[] = ['CREDIT_CARD', 'DEBIT_CARD'];

    if (!validPaymentMethods.includes(params.paymentMethod)) {
      throw new BadRequestException('Invalid transaction', {
        description: `A valid payment method wasnt given, acceptable methods: ${validPaymentMethods.join(', ')}`
      });
    }

    return this.repository.create({
      ...params,
      cardNumber: params.cardNumber.slice(-4)
    });
  };
}