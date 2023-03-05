import { PayableStatus } from '@prisma/client';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards
} from '@nestjs/common';

import { AuthUser } from '../core/auth/decorators/auth-user.decorator';

import { SessionAuthGuard } from '../core/auth/guards/session-auth.guard';
import { JwtAuthGuard } from '../core/auth/guards/jwt-auth.guard';

import { ListUserPayablesUseCase } from '@/src/app/use-cases/payables/list-user-payables';

import { UserEntity } from '@/src/app/entities/user.entity';
import { PayableEntity } from '@/src/app/entities/payable.entity';

@Controller('payables')
@UseGuards(SessionAuthGuard, JwtAuthGuard)
export class PayableController {
  constructor(private readonly listUserPayablesUseCase: ListUserPayablesUseCase) {}

  @Get(':status')
  @HttpCode(HttpStatus.OK)
  public async list(
    @AuthUser() user: UserEntity,
    @Param('status') status: PayableStatus
  ): Promise<{ payables: PayableEntity[] }> {
    return this.listUserPayablesUseCase.exec({
      userId: user.id,
      payableStatus: status
    });
  }
}