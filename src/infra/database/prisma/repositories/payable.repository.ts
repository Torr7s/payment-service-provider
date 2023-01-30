import { PayableStatus } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';

import { PayableEntity } from '@/domain/entities/payable.entity';

export class PrismaPayableRepository implements PayableRepository {
  private readonly _include = {
    transaction: {
      select: {
        id: true,
        value: true,
        description: true,
        createdAt: true,
        updatedAt: true
      }
    }
  }

  constructor(private prismaService: PrismaService) {}

  public async create(data: PayableEntity): Promise<PayableEntity> {
    return this.prismaService.payable.create({
      data: {
        userId: data.userId,
        transactionId: data.transactionId,
        paymentDate: data.paymentDate,
        fee: data.fee,
        status: data.status
      }
    });
  }

  public async listUserPayables(userId: string, payableStatus: PayableStatus) {
    return this.prismaService.payable.findMany({
      where: {
        userId,
        status: payableStatus
      },
      include: this._include
    });
  }
}