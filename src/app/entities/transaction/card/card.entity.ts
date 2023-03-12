export interface CardProps {
  cardCVV: string;
  cardExpirationDate: Date;
  cardNumber: string;
  cardOwnerName: string;
}

export class Card {
  private props: CardProps;

  constructor(props: CardProps) {
    const cardNumber: string = this.formatCardNumber(props.cardNumber);
    const hasValidLength: boolean = this.validateCardNumberLength(cardNumber);

    if (!hasValidLength) {
      throw new Error(
        'Card number must have a length of 16 characters'
      );
    }

    this.props = {
      ...props,
      cardNumber: this.getLastCardNumberDigits(props.cardNumber)
    };
  }

  public get cvv(): string {
    return this.props.cardCVV;
  }

  public get expirationDate(): Date {
    return this.props.cardExpirationDate;
  }

  public get number(): string {
    return this.props.cardNumber;
  }

  public get ownerName(): string {
    return this.props.cardOwnerName;
  }

  private validateCardNumberLength(cardNumber: string): boolean {
    return cardNumber.length === 16;
  }

  private formatCardNumber(cardNumber: string): string {
    return cardNumber.replace(/\D+/g, '');
  }

  private getLastCardNumberDigits(cardNumber: string): string {
    return cardNumber.slice(-4);
  }
}