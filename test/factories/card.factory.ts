import { Card, CardProps } from '@/src/app/entities/transaction/card';

export const makeCard = (card: Partial<CardProps> = {}): Card => {
  return new Card({
    cardCVV: '777',
    cardExpirationDate: new Date(),
    cardNumber: '4444 4444 4444 4444',
    cardOwnerName: 'John Doe',
    ...card
  });
}