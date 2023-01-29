import { BadRequestException } from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { ICreateTransactionRequest, ICreateTransactionUseCase } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async exec(input: ICreateTransactionRequest): Promise<Transaction> {
    const validPaymentMethods: string[] = ['credit_card', 'debit_card'];

    if (!validPaymentMethods.includes(input.paymentMethod)) {
      throw new BadRequestException('Invalid transaction', {
        description: `A valid payment method wasn't given, acceptable methods: ${validPaymentMethods.join(', ')}`
      });
    }

    return this.transactionRepository.create(input.consumerId, {
      ...input,
      cardNumber: input.cardNumber.slice(-4)
    });
  };
}