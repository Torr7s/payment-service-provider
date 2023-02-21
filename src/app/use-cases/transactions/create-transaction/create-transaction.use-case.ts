import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { CreatePayableUseCase } from '../../payables/create-payable';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';
import { TransactionException } from '@/app/exceptions/transaction.exception';
import { TransactionEntity } from '@/app/entities/transaction.entity';

import { PaymentMethod } from '@/@types';

export interface CreateTransactionUseCaseInput {
  value: string;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
  userId: string;
}

export interface CreateTransactionUseCaseOutput {
  transaction: TransactionEntity;
}

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