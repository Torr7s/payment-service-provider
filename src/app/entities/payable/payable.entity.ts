import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

import { PayableStatus } from '@/src/types';

import { Replace } from '@/src/app/helpers/replace.helper';

export interface PayableProps {
  userId: string;
  transactionId: string;
  status: PayableStatus;
  paymentDate: Date;
  fee: Prisma.Decimal;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Payable {
  private _id: string;
  private _props: PayableProps;

  constructor(
    props: Replace<PayableProps, {
      createdAt?: Date
    }>, 
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt?? new Date()
    }
  }

  public get id(): string {
    return this._id;
  }

  public get status(): PayableStatus {
    return this._props.status;
  }

  public set status(status: PayableStatus) {
    this._props.status = status;
  }

  public get paymentDate(): Date {
    return this._props.paymentDate;
  }

  public set paymentDate(paymentDate: Date) {
    this._props.paymentDate = paymentDate;
  }

  public get fee(): Prisma.Decimal {
    return this._props.fee;
  }

  public set fee(fee: Prisma.Decimal) {
    this._props.fee = fee;
  }

  public get userId(): string {
    return this._props.userId;
  }

  public get transactionId(): string {
    return this._props.transactionId;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this._props.updatedAt;
  }

  public set updatedAt(updatedAt: Date | null) {
    this._props.updatedAt = updatedAt;
  }
}