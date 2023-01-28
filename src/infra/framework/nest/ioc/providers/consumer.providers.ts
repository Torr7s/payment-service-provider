import { Provider } from '@nestjs/common';

import { ConsumerRepository } from '@/app/abstracts/repositories/consumer.repository';

import { FindConsumerByIdUseCase } from '@/app/use-cases/consumers/find-consumer-by-id';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { PrismaConsumerRepository } from '@/infra/database/prisma/repositories/consumer.repository';

export const ConsumerModuleProviders: Provider[] = [
  PrismaService,
  {
    provide: ConsumerRepository,
    useFactory: (prismaService: PrismaService): PrismaConsumerRepository => 
      new PrismaConsumerRepository(prismaService),
    inject: [PrismaService]
  },
  {
    provide: FindConsumerByIdUseCase,
    useFactory: (consumerRepository: ConsumerRepository): FindConsumerByIdUseCase => 
      new FindConsumerByIdUseCase(consumerRepository),
    inject: [ConsumerRepository]
  }
]