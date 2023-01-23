import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { 
  IFindConsumerByEmailUseCase, 
  IFindConsumerByIdUseCase,
  NSFindConsumerByEmailUseCase,
  NSFindConsumerByIdUseCase
} from '@/domain/use-cases/consumers';

import { ConsumerRepository } from '@/app/abstracts/repositories';

export class FindConsumerUseCase implements IFindConsumerByEmailUseCase, IFindConsumerByIdUseCase {
  constructor(private readonly repository: ConsumerRepository) {}

  public async findByEmail({ email }: NSFindConsumerByEmailUseCase.Input): Promise<NSFindConsumerByEmailUseCase.Output> {
    const consumer: Consumer = await this.repository.findByEmail({ email });

    if (!consumer) {
      throw new BadRequestException('Invalid consumer', {
        description: 'No consumer were found with the given email'
      });
    }

    return consumer;
  }

  public async findById({ id }: NSFindConsumerByIdUseCase.Input): Promise<NSFindConsumerByIdUseCase.Output> {
    const consumer: Consumer = await this.repository.findById({ id });

    if (!consumer) {
      throw new BadRequestException('Invalid consumer', {
        description: 'No consumer were found with the given ID'
      });
    }

    return consumer;
  }
}