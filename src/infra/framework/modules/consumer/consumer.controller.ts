import { Consumer } from '@prisma/client';
import { 
  Controller, 
  Get, 
  Param, 
  ParseUUIDPipe
} from '@nestjs/common';

import { FindConsumerByIdUseCase } from '@/app/use-cases/consumers/find-consumer-by-id';

@Controller('consumers')
export class ConsumerController {
  constructor(private readonly findConsumerByIdUseCase: FindConsumerByIdUseCase) {}

  @Get(':consumerId')
  public async findById(@Param('consumerId', new ParseUUIDPipe()) consumerId: string): Promise<Consumer> {
    return this.findConsumerByIdUseCase.exec(consumerId);
  }
}