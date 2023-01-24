import { Transaction } from '@prisma/client';
import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  Post 
} from '@nestjs/common';

import { CreateTransactionUseCase, ListTransactionsUseCase } from '@/app/use-cases/transactions';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly listTransactionsUseCase: ListTransactionsUseCase
  ) {}

  @Post()
  public async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get(':consumerId')
  public async list(@Param('consumerId', new ParseUUIDPipe()) consumerId: string): Promise<Transaction[]> {
    return this.listTransactionsUseCase.execute({ consumerId });
  }
}