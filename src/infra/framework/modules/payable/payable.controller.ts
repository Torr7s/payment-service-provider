import { PayableStatus } from '@prisma/client';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards
} from '@nestjs/common';

import { AuthUser } from '../auth/decorators/auth-user.decorator';

import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ListPayablesUseCase } from '@/app/use-cases/payables/list-payables';

import { UserEntity } from '@/domain/entities/user.entity';
import { PayableEntity } from '@/domain/entities/payable.entity';

@Controller('payables')
@UseGuards(SessionAuthGuard, JwtAuthGuard)
export class PayableController {
  constructor(private readonly listPayablesUseCase: ListPayablesUseCase) {}

  @Get(':status')
  @HttpCode(HttpStatus.OK)
  public async listAvailablePayables(
    @AuthUser() user: UserEntity,
    @Param('status') status: PayableStatus
  ): Promise<Array<PayableEntity>> {
    return this.listPayablesUseCase.exec(user.id, status);
  }
}