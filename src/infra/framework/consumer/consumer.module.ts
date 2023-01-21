import { Module } from '@nestjs/common';

import { ConsumerController } from './consumer.controller';

import { ConsumerRepository } from '@/app/repositories/consumer.repository';
import { CreateConsumerUseCase } from '@/app/use-cases/consumers/create-consumer.use-case';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaConsumerRepository } from '@/infra/database/prisma/repositories/consumers.repository';

@Module({
  controllers: [ConsumerController],
  providers: [
    PrismaService,
    {
      provide: ConsumerRepository,
      useFactory: (prismaService: PrismaService): PrismaConsumerRepository => new PrismaConsumerRepository(prismaService),
      inject: [PrismaService]
    },
    {
      provide: CreateConsumerUseCase,
      useFactory: (repository: ConsumerRepository): CreateConsumerUseCase => new CreateConsumerUseCase(repository),
      inject: [ConsumerRepository]
    }
  ]
})
export class ConsumerModule {}