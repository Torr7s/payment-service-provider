import { PaymentMethod } from '@/@types';

import { TransactionEntity } from '@/domain/entities/transaction.entity';

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