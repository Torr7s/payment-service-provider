import { Test, TestingModule} from '@nestjs/testing';

import { ConsumerController } from './consumer.controller';

import { ConsumerRepository } from '@/app/abstracts/repositories';

import { ConsumerInMemoryRepository } from '@/infra/database/prisma/repositories/in-memory/consumer.in-memory.repository';

describe('ConsumerController', (): void => {
  let consumerController: ConsumerController;

  beforeEach(async (): Promise<void> => {
    const consumerModule: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerController],
      providers: [
        {
          provide: ConsumerRepository,
          useClass: ConsumerInMemoryRepository
        },
      ]
    }).compile();

    consumerController = consumerModule.get<ConsumerController>(ConsumerController);
  });

  it('should be defined', (): void => {
    expect(consumerController).toBeDefined();
  });
});