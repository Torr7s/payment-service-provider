import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

import { Card } from './card/card.entity';

import { PaymentMethod } from '@/src/types';

import { Replace } from '@/src/app/helpers/replace.helper';

export interface TransactionProps {
  description: string;
  card: Card;
  value: Prisma.Decimal;
  paymentMethod: PaymentMethod;
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Transaction {
  private _id: string;
  private _props: TransactionProps;

  constructor(
    props: Replace<TransactionProps, {
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

  public get value(): Prisma.Decimal {
    return this._props.value;
  }

  public get description(): string {
    return this._props.description;
  }

  public set description(description: string) {
    this._props.description = description;
  }

  public get paymentMethod(): PaymentMethod {
    return this._props.paymentMethod;
  }

  public get card(): Card {
    return this._props.card;
  }

  public set card(card: Card) {
    this._props.card = card;
  }

  public get userId(): string {
    return this._props.userId;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this._props.updatedAt;
  }

  public set updatedAt(updatedAt: Date | null | undefined) {
    this._props.updatedAt = updatedAt;
  }
}