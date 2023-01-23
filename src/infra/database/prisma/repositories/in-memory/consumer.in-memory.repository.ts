import crypto from 'node:crypto';
import { Consumer } from '@prisma/client';

import { ConsumerRepository } from '@/app/abstracts/repositories';

import { 
  NSConsumerRepositoryCreate, 
  NSConsumerRepositoryFindByEmail, 
  NSConsumerRepositoryFindById 
} from '@/domain/contracts/repositories';

export class ConsumerInMemoryRepository implements ConsumerRepository {
  protected readonly consumers: Consumer[];

  constructor() {
    this.consumers = [];
  }

  public async create(params: NSConsumerRepositoryCreate.Input): Promise<NSConsumerRepositoryCreate.Output> {
    const elem = this.consumers.push({
      id: crypto.randomUUID(),
      email: params.email,
      password: 'random_pass',
      fullName: params.fullName,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    });

    return this.consumers.at(elem - 1);
  } 

  public async findByEmail({ email }: NSConsumerRepositoryFindByEmail.Input): Promise<NSConsumerRepositoryFindByEmail.Output> {
    return this.consumers.find(consumer => consumer.email === email);
  }

  public async findById({ id }: NSConsumerRepositoryFindById.Input): Promise<NSConsumerRepositoryFindById.Output> {
    return this.consumers.find(consumer => consumer.id === id);
  }
}