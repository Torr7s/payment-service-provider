import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { IFindConsumerByIdUseCase } from '@/domain/use-cases/consumers';

import { ConsumerRepository } from '@/app/abstracts/repositories/consumer.repository';

export class FindConsumerByIdUseCase implements IFindConsumerByIdUseCase {
  constructor(private readonly repository: ConsumerRepository) {}

  public async exec(id: string): Promise<Consumer> {
    const consumer: Consumer = await this.repository.findById(id);

    if (!consumer) {
      throw new BadRequestException('Invalid consumer', {
        description: 'No consumer were found with the given ID'
      });
    }

    return consumer;
  }
}