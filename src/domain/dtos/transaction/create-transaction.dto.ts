import { PaymentMethod } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class CreateTransactionDto {
  value: string | Decimal;
  description: string;
  paymentMethod: string | PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
}