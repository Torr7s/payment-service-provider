import { Module } from '@nestjs/common';

import { ConsumerController } from './consumer.controller';

import { ConsumerRepository } from '@/app/abstracts/repositories/consumer.repository';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaConsumerRepository } from '@/infra/database/prisma/repositories/consumer.repository';

@Module({
  controllers: [ConsumerController],
  providers: [
    PrismaService,
    {
      provide: ConsumerRepository,
      useFactory: (prismaService: PrismaService): PrismaConsumerRepository => new PrismaConsumerRepository(prismaService),
      inject: [PrismaService]
    }
  ]
})
export class ConsumerModule {}