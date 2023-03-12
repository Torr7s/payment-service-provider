import { Injectable } from '@nestjs/common';

import { 
  PayableStatus, 
  Payable as PrismaPayable 
} from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { PrismaPayableMapper } from '../mappers/payable.mapper';

import { Payable } from '@/src/app/entities/payable';
import { PayableRepository } from '@/src/app/repositories/payable.repository';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: Payable): Promise<Payable> {
    const prismaPayableData: PrismaPayable = await this.prismaService.payable.create({
      data: PrismaPayableMapper.toPrisma(data)
    }); 

    const payable: Payable = PrismaPayableMapper.toDomain(prismaPayableData);

    return payable
  }

  public async listUserPayables(userId: string, payableStatus: PayableStatus): Promise<Payable[]> {
    const prismaPayableData: PrismaPayable[] = await this.prismaService.payable.findMany({
      where: {
        userId,
        status: payableStatus
      },
    });

    const payables: Payable[] = prismaPayableData.map(
      PrismaPayableMapper.toDomain
    );

    return payables;
  }
}