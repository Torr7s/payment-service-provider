import { PaymentMethod, Prisma } from '@prisma/client';

import { BaseEntity } from './base.entity';

export class TransactionEntity extends BaseEntity {
  value: string | number | Prisma.Decimal;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
  consumer?: Prisma.ConsumerCreateNestedOneWithoutTransactionsInput;
  payable?: Prisma.PayableCreateNestedOneWithoutTransactionInput;
}