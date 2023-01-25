import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@/domain/repositories/consumer.repository';

export abstract class ConsumerRepository implements IConsumerRepository {
  public abstract findById: (id: string) => Promise<Consumer>;
}