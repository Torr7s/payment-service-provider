import { Transaction } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthUser } from '../auth/decorators/auth-user.decorator';

import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListTransactionsUseCase } from '@/app/use-cases/transactions/list-transactions';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

import { UserEntity } from '@/domain/entities/user.entity';

@Controller('transactions')
@UseGuards(SessionAuthGuard, JwtAuthGuard)
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly listTransactionsUseCase: ListTransactionsUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @AuthUser() user: UserEntity,
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    return this.createTransactionUseCase.exec({
      ...createTransactionDto,
      consumerId: user.consumerProfile.id
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(@AuthUser() user: UserEntity): Promise<Transaction[]> {
    return this.listTransactionsUseCase.exec(user.consumerProfile.id);
  }
}