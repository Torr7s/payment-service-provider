import { PrismaService } from '../prisma.service';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';

import { PayableEntity } from '@/domain/entities/payable.entity';

export class PrismaPayableRepository implements PayableRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: PayableEntity): Promise<PayableEntity> {
    return this.prismaService.payable.create({
      data: {
        consumerId: data.consumerId,
        transactionId: data.transactionId,
        paymentDate: data.paymentDate,
        fee: data.fee,
        status: data.status
      }
    });
  }
}