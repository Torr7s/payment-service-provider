import { PayableStatus } from '@prisma/client';

import { PayableEntity } from '@/domain/entities/payable.entity';

export interface IListPayablesUseCase {
  exec: (consumerId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>
}