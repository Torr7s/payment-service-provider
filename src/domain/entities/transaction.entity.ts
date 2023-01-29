import { PaymentMethod, Prisma } from '@prisma/client';

export class TransactionEntity {
  id?: string;
  value: string | number | Prisma.Decimal;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
  consumer?: Prisma.ConsumerCreateNestedOneWithoutTransactionsInput;
  payable?: Prisma.PayableCreateNestedOneWithoutTransactionInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}