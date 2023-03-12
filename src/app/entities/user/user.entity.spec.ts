import { User, UserProps } from './user.entity';
import { Transaction } from '../transaction';

import { makeTransaction } from '@/test/factories/transaction.factory';

describe('User entity', (): void => {
  it('should create a user', (): void => {
    const transactions: Transaction[] = [
      makeTransaction(), 
      makeTransaction(), 
      makeTransaction()
    ];

    const props: UserProps = {
      fullName: 'John Doe',
      email: 'john@doe.com',
      password: 'youshallnotpass',
      transactions,
      createdAt: new Date()
    }

    const user = new User(props);

    expect(user.id).toBeDefined();
    
    expect(user.fullName).toBe(props.fullName);
    expect(user.email).toBe(props.email);
  
    expect(user.transactions).toHaveLength(3);
    expect(user.payables).toHaveLength(0);
  });
});