import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { CreatConsumerUseCaseDomain, CreateConsumerUseCaseNS } from '@/domain/use-cases/consumers';

import { ConsumerRepository } from '@/app/repositories';

export class CreateConsumerUseCase implements CreatConsumerUseCaseDomain {
  constructor(private readonly repository: ConsumerRepository) {}

  public async execute(params: CreateConsumerUseCaseNS.Input): Promise<CreateConsumerUseCaseNS.Output> {
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