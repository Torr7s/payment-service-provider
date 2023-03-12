import { Payable as PrismaPayable } from '@prisma/client';

import { Payable } from '@/src/app/entities/payable';

export class PrismaPayableMapper {
  private constructor() {
    throw new Error(
      'PrismaPayableMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(payable: Payable): PrismaPayable {
    return {
      id: payable.id,
      fee: payable.fee,
      paymentDate: payable.paymentDate,
      status: payable.status,
      transactionId: payable.transactionId,
      userId: payable.userId,
      createdAt: payable.createdAt,
      updatedAt: payable.updatedAt
    }
  }

  public static toDomain(prismaPayable: PrismaPayable): Payable {
    return new Payable({
      fee: prismaPayable.fee,
      paymentDate:  prismaPayable.paymentDate,
      status: prismaPayable.status,
      transactionId: prismaPayable.transactionId,
      userId: prismaPayable.userId,
      createdAt: prismaPayable.createdAt,
      updatedAt: prismaPayable.updatedAt,
    });
  }
}