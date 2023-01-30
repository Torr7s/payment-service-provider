import { BadRequestException } from '@nestjs/common';
import { PayableStatus } from '@prisma/client';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';

import { PayableEntity } from '@/domain/entities/payable.entity';

import { IListPayablesUseCase } from '@/domain/use-cases/payable/list-payables.use-case';

export class ListPayablesUseCase implements IListPayablesUseCase {
  constructor(private readonly payableRepository: PayableRepository) {}

  public async exec(consumerId: string, payableStatus: PayableStatus): Promise<Array<PayableEntity>> {
    const status = {
      available: PayableStatus.paid,
      waiting_funds: PayableStatus.waiting_funds
    }
    
    const chosenStatus: PayableStatus = status[payableStatus];

    if (!chosenStatus) {
      throw new BadRequestException(
        `Invalid status provided! Acceptable options: available, waiting_funds`
      );
    }

    return this.payableRepository.listPayables(consumerId, chosenStatus);
  }
}