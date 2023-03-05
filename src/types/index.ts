export type JwtPayload = {
  sub: string;
  iat?: string;
  exp?: string;
}

export type UserWhereFilter = {
  email?: string;
  id?: string;
}

export type PayableStatus = 'paid' | 'waiting_funds';

export type PaymentMethod = 'credit_card' | 'debit_card';