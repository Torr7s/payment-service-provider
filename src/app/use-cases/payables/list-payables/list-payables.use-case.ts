import { HttpStatus } from '@nestjs/common';
import { PayableStatus } from '@prisma/client';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { PayableException } from '@/app/exceptions/payable.exception';
import { PayableEntity } from '@/domain/entities/payable.entity';

import { IListPayablesUseCase } from '@/domain/use-cases/payable/list-payables.use-case';

export class ListPayablesUseCase implements IListPayablesUseCase {
  constructor(private readonly payableRepository: PayableRepository) {}

  public async exec(userId: string, payableStatus: PayableStatus): Promise<Array<PayableEntity>> {
    const status = {
      available: PayableStatus.paid,
      waiting_funds: PayableStatus.waiting_funds
    }

    const statusMatched: PayableStatus = status[payableStatus];

    if (!statusMatched) {
      throw new PayableException(
        'Invalid payable status provided! Acceptable options: available, waiting_funds',
        HttpStatus.BAD_REQUEST
      );
    }

    return this.payableRepository.listUserPayables(userId, statusMatched);
  }
}