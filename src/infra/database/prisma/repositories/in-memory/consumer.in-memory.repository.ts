import { Consumer } from '@prisma/client';

import { ConsumerRepository } from '@/app/abstracts/repositories/consumer.repository';

export class ConsumerInMemoryRepository implements ConsumerRepository {
  protected readonly consumers: Consumer[];

  constructor() {
    this.consumers = [];
  }

  public async findById(id: string): Promise<Consumer> {
    return this.consumers.find(consumer => consumer.id === id);
  }
}