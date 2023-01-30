import { BadRequestException } from '@nestjs/common';

import { CreatePayableUseCase } from '../../payables/create-payable';

import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { PayableEntity } from '@/domain/entities/payable.entity';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { ICreateTransactionRequest, ICreateTransactionUseCase } from '@/domain/use-cases/transactions';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly createPayableUseCase: CreatePayableUseCase,
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async exec(input: ICreateTransactionRequest): Promise<TransactionEntity> {
    const validPaymentMethods: string[] = ['credit_card', 'debit_card'];

    if (!validPaymentMethods.includes(input.paymentMethod)) {
      throw new BadRequestException(
        `Invalid payment method! Acceptable options: credit_card, debit_card`
      );
    }

    const transaction: TransactionEntity = await this.transactionRepository.create(input);
    const payable: PayableEntity = await this.createPayableUseCase.exec(transaction.id);

    return {
      ...transaction,
      payable
    };
  };
}