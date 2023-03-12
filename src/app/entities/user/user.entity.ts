import { randomUUID } from 'crypto';

import { Transaction } from '../transaction';
import { Payable } from '../payable';

import { Replace } from '@/src/app/helpers/replace.helper';

export interface UserProps {
  fullName: string;
  email: string;
  password: string;
  transactions?: Transaction[] | null;
  payables?: Payable[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private _id: string;
  private _props: UserProps;

  constructor(
    props: Replace<UserProps, {
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

  public get fullName(): string {
    return this._props.fullName;
  }

  public set fullName(fullName: string) {
    this._props.fullName = fullName;
  }

  public get email(): string {
    return this._props.email;
  }

  public set email(email: string) {
    this._props.email = email;
  }

  public set password(password: string) {
    this._props.password = password;
  }

  public get transactions(): Transaction[] | null | undefined {
    return this._props.transactions ?? [];
  }

  public get payables(): Payable[] | null | undefined {
    return this._props.payables ?? [];
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