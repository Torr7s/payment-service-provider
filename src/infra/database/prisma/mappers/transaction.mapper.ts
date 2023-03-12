import { Transaction as PrismaTransaction } from '@prisma/client';

import { Card } from '@/src/app/entities/transaction/card';
import { Transaction } from '@/src/app/entities/transaction';

export class PrismaTransactionMapper {
  private constructor() {
    throw new Error(
      'PrismaTransactionMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(transaction: Transaction): PrismaTransaction {
    return {
      id: transaction.id,
      cardCVV: transaction.card.cvv,
      cardExpirationDate: transaction.card.expirationDate,
      cardNumber: transaction.card.number,
      cardOwnerName: transaction.card.ownerName,
      description: transaction.description,
      paymentMethod: transaction.paymentMethod,
      userId: transaction.userId,
      value: transaction.value,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    }
  }

  public static toDomain(prismaTransaction: PrismaTransaction): Transaction {
    return new Transaction({
      description: prismaTransaction.description,
      value: prismaTransaction.value,
      card: new Card({
        cardCVV: prismaTransaction.cardCVV,
        cardExpirationDate: prismaTransaction.cardExpirationDate,
        cardNumber: prismaTransaction.cardNumber,
        cardOwnerName: prismaTransaction.cardOwnerName,
      }),
      paymentMethod: prismaTransaction.paymentMethod,
      userId: prismaTransaction.userId,
      createdAt: prismaTransaction.createdAt,
      updatedAt: prismaTransaction.updatedAt
    });
  }
}