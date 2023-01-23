import { PaymentMethod } from '@prisma/client';
import { 
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface 
} from 'class-validator';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

export function CheckPaymentMethod(values: typeof PaymentMethod, validationOptions: ValidationOptions) {
  return (obj: Object, propertyName: string): void => {
    registerDecorator({
      target: obj.constructor,
      propertyName,
      options: validationOptions,
      constraints: [values],
      validator: CheckPaymentMethodValidator
    });
  }
}

@ValidatorConstraint({ name: 'CheckPaymentMethod' })
class CheckPaymentMethodValidator implements Partial<ValidatorConstraintInterface> {
  public validate(_: typeof PaymentMethod, validationArguments: ValidationArguments): boolean {
    const { paymentMethod } = validationArguments.object as CreateTransactionDto;
    const constraints: any = Object.values(validationArguments.constraints[0]);

    return constraints.includes(paymentMethod);
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    const { constraints } = validationArguments;
    const objConstraints: string = Object.values(constraints[0]).join(', ');

    return `Invalid payment method, acceptable options: ${objConstraints}`;
  }
}
