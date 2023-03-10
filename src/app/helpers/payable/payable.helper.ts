import { PaymentMethod, Prisma } from '@prisma/client';

import { Transaction } from '../../entities/transaction';

enum PaymentMethodFee {
  CREDIT_CARD = 0.05,
  DEBIT_CARD = 0.03
}

export const calculateFee = (transaction: Transaction): Prisma.Decimal => {
  const paymentMethod: string = transaction.paymentMethod;
  const value: number = Number(transaction.value);

  if (paymentMethod === PaymentMethod.credit_card) {
    const creditDiscount: number = PaymentMethodFee.CREDIT_CARD;

    return new Prisma.Decimal(value - (value * creditDiscount));
  } else if (paymentMethod === PaymentMethod.debit_card) {
    const debitDiscount: number = PaymentMethodFee.DEBIT_CARD;

    return new Prisma.Decimal(value - (value * debitDiscount));
  }
}