import crypto from 'node:crypto';
import { Consumer } from '@prisma/client';

import { ConsumerRepository } from '@/app/repositories';

import { ConsumerRepositoryCreateNS, ConsumerRepositoryFindByEmailNS, ConsumerRepositoryFindByIdNS } from '@/domain/contracts/repositories';

export class ConsumerInMemoryRepository implements ConsumerRepository {
  protected readonly consumers: Consumer[];

  constructor() {
    this.consumers = [];
  }

  public async create(params: ConsumerRepositoryCreateNS.Input): Promise<ConsumerRepositoryCreateNS.Output> {
    const elem = this.consumers.push({
      id: crypto.randomUUID(),
      email: params.email,
      fullName: params.fullName,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    });

    return this.consumers.at(elem - 1);
  } 

  public async findByEmail({ email }: ConsumerRepositoryFindByEmailNS.Input): Promise<ConsumerRepositoryFindByEmailNS.Output> {
    return this.consumers.find(consumer => consumer.email === email);
  }

  public async findById({ id }: ConsumerRepositoryFindByIdNS.Input): Promise<ConsumerRepositoryFindByIdNS.Output> {
    return this.consumers.find(consumer => consumer.id === id);
  }
}