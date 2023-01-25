import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { IFindConsumerByIdUseCase, NSFindConsumerByIdUseCase } from '@/domain/use-cases/consumers';

import { ConsumerRepository } from '@/app/abstracts/repositories';

export class FindConsumerByIdUseCase implements IFindConsumerByIdUseCase {
  constructor(private readonly repository: ConsumerRepository) {}

  public async execute({ id }: NSFindConsumerByIdUseCase.Input): Promise<NSFindConsumerByIdUseCase.Output> {
    const consumer: Consumer = await this.repository.findById({ id });

    if (!consumer) {
      throw new BadRequestException('Invalid consumer', {
        description: 'No consumer were found with the given ID'
      });
    }

    return consumer;
  }
}