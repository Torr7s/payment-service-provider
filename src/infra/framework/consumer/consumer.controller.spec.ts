import { Test, TestingModule} from '@nestjs/testing';

import { ConsumerController } from './consumer.controller';

import { ConsumerRepository } from '@/app/repositories';
import { CreateConsumerUseCase } from '@/app/use-cases/consumers';

import { ConsumerInMemoryRepository } from '@/infra/database/prisma/repositories/in-memory/consumer.in-memory.repository';

describe('ConsumerController', (): void => {
  let consumerController: ConsumerController;

  const fullName: string = 'John Doe';
  const email: string = 'johndoe@gmail.com';

  beforeEach(async (): Promise<void> => {
    const consumerModule: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerController],
      providers: [
        {
          provide: ConsumerRepository,
          useClass: ConsumerInMemoryRepository
        },
        {
          provide: CreateConsumerUseCase,
          useFactory: (repository: ConsumerRepository)=> new CreateConsumerUseCase(repository),
          inject: [ConsumerRepository]
        }
      ]
    }).compile();

    consumerController = consumerModule.get<ConsumerController>(ConsumerController);
  });

  it('should be defined', (): void => {
    expect(consumerController).toBeDefined();
  });

  it('should create a new consumer', async (): Promise<void> => {
    const consumer = await consumerController.create({
      fullName, 
      email
    });

    expect(consumer).toHaveProperty('id');
  });
});