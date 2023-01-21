import { Consumer } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { CreatConsumerUseCaseDomain, CreateConsumerUseCaseNS } from '@/domain/useCases/consumers';

import { ConsumersRepository } from '@/app/repositories/consumers.repository';

export class CreateConsumerUseCase implements CreatConsumerUseCaseDomain {
  constructor(private readonly repository: ConsumersRepository) { }

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