import { BadRequestException } from '@nestjs/common';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { ICreateTransactionRequest, ICreateTransactionUseCase } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async exec(input: ICreateTransactionRequest): Promise<TransactionEntity> {
    const validPaymentMethods: string[] = ['credit_card', 'debit_card'];

    if (!validPaymentMethods.includes(input.paymentMethod)) {
      throw new BadRequestException(
        `Invalid payment method! Acceptable options: credit_card, debit_card`
      );
    }

    return this.transactionRepository.create(input);
  };
}