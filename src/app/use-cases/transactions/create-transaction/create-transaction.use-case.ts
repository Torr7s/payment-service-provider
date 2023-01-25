import { BadRequestException } from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { ICreateTransactionUseCase } from '@/domain/use-cases/transactions';
import { CreateTransactionDto } from '@/domain/dtos/transaction';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public async exec(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const validPaymentMethods: string[] = ['CREDIT_CARD', 'DEBIT_CARD'];

    if (!validPaymentMethods.includes(createTransactionDto.paymentMethod)) {
      throw new BadRequestException('Invalid transaction', {
        description: `A valid payment method wasn't given, acceptable methods: ${validPaymentMethods.join(', ')}`
      });
    }

    return this.repository.create({
      ...createTransactionDto,
      cardNumber: createTransactionDto.cardNumber.slice(-4)
    });
  };
}