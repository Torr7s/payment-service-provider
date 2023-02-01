import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { CreatePayableUseCase } from '../../payables/create-payable';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { TransactionException } from '@/app/exceptions/transaction.exception';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { CreateTransactionUseCaseInput, CreateTransactionUseCaseOutput } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements
  UseCase<
    CreateTransactionUseCaseInput,
    CreateTransactionUseCaseOutput
  > {
  constructor(
    private readonly createPayableUseCase: CreatePayableUseCase,
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async exec(input: CreateTransactionUseCaseInput): Promise<CreateTransactionUseCaseOutput> {
    const validPaymentMethods: string[] = ['credit_card', 'debit_card'];

    if (!validPaymentMethods.includes(input.paymentMethod)) {
      throw new TransactionException(
        'Invalid payment method provided! Acceptable options: credit_card, debit_card',
        HttpStatus.BAD_REQUEST
      );
    }

    const transaction: TransactionEntity = await this.transactionRepository.create({
      ...input,
      cardNumber: input.cardNumber.slice(-4)
    });

    const { payable } = await this.createPayableUseCase.exec({ transaction });

    return {
      transaction: {
        ...transaction,
        payable
      }
    };
  };
}