import { User } from '@/src/app/entities/user';
import { UserDto } from '../dtos/authentication/user.dto';

export class UserMapper {
  private constructor() {
    throw new Error(
      'UserMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(user: User): UserDto {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      ...(
        user.transactions.length && {
          transactions: user.transactions
        }
      ),
      ...(
        user.payables.length && {
          payables: user.payables
        }
      ),
      createdAt: user.createdAt
    }
  }
}