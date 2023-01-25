import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { IFindConsumerByEmailUseCase, NSFindConsumerByEmailUseCase } from '@/domain/use-cases/consumers';

import { ConsumerRepository } from '@/app/abstracts/repositories';

export class FindConsumerByEmailUseCase implements IFindConsumerByEmailUseCase {
  constructor(private readonly repository: ConsumerRepository) {}

  public async execute({ email }: NSFindConsumerByEmailUseCase.Input): Promise<NSFindConsumerByEmailUseCase.Output> {
    const consumer: Consumer = await this.repository.findByEmail({ email });

    if (!consumer) {
      throw new BadRequestException('Invalid consumer', {
        description: 'No consumer were found with the given email'
      });
    }

    return consumer;
  }
}