import { makeCard } from '@/test/factories/card.factory';

describe('Card entity', (): void => {
  it('should thrown when card number has an invalid length', (): void => {
    expect((): void => {
      makeCard({
        cardNumber: '4444 4444'
      });
    }).toThrow(new Error('Card number must have a length of 16 characters'));
  });

  it('should create a card', (): void => {
    const card = makeCard({
      cardNumber: '4444 4444 4444 4444'
    });

    expect(card.cvv).toBeDefined();
    expect(card.number).toBe('4444');
  });
});