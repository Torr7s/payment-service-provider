import { Payable } from '@/src/app/entities/payable';
import { Transaction } from '@/src/app/entities/transaction';

export class UserDto {
  id: string;
  fullName: string;
  email: string;
  transactions?: Transaction[] | null;
  payables?: Payable[] | null;
  createdAt: Date;
}