import { PaymentMethod, Prisma, Transaction } from '@prisma/client';

export interface ICreateTransactionRequest {
  value: string | Prisma.Decimal;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
  consumerId: string;
}

export interface ICreateTransactionUseCase {
  exec: (input: ICreateTransactionRequest) => Promise<Transaction>;
}