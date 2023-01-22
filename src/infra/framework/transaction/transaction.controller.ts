import { Transaction } from '@prisma/client';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly createTransactionUseCase: CreateTransactionUseCase) {}

  @Post()
  public async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.createTransactionUseCase.execute(createTransactionDto);
  }
}