import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { ICreateConsumerUseCase, NSCreateConsumerUseCase } from '@/domain/use-cases/consumers';

import { ConsumerRepository } from '@/app/abstracts/repositories';

export class CreateConsumerUseCase implements ICreateConsumerUseCase {
  constructor(private readonly repository: ConsumerRepository) {}

  public async execute(params: NSCreateConsumerUseCase.Input): Promise<NSCreateConsumerUseCase.Output> {
    const consumerAlreadyRegistered: Consumer = (
      await this.repository.findByEmail({
        email: params.email
      })
    );

    if (consumerAlreadyRegistered) {
      throw new BadRequestException('Invalid registration', {
        description: 'Consumer already registered in the system'
      });
    }

    return this.repository.create(params);
  }
}