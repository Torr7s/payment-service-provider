import { Consumer } from '@prisma/client';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateConsumerUseCase } from '@/app/use-cases/consumers';

import { CreateConsumerDto } from '@/domain/dtos/consumer/create-consumer.dto';

@Controller('consumers')
export class ConsumerController {
  constructor(private readonly createConsumerUseCase: CreateConsumerUseCase) {}

  @Post()
  public async create(@Body() createConsumerDto: CreateConsumerDto): Promise<Consumer> {
    return this.createConsumerUseCase.execute(createConsumerDto);
  }
}