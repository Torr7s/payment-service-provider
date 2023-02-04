import { AuthSignInUseCase } from './sign-in.use-case';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { AuthSignInInput } from '@/domain/use-cases/auth';

import { UserInMemoryRepository } from '@/infra/database/prisma/repositories/in-memory/user-memory.repository';

describe('AuthSignInUseCase', (): void => {
  let userRepository: UserRepository;
  let authSignInUseCase: AuthSignInUseCase;

  const email = 'johndoe@example.com';
  const password = 'youshallnotpass';

  beforeEach((): void => {
    userRepository = new UserInMemoryRepository();
    authSignInUseCase = new AuthSignInUseCase(userRepository);
  });

  it('should be defined', (): void => {
    expect(authSignInUseCase).toBeDefined();
  });

  it('should not sign in an user when the given email does not exists', async (): Promise<void> => {
    const input: AuthSignInInput = {
      email,
      password
    }

    await expect(authSignInUseCase.exec(input)).rejects.toThrowError('Invalid credentials');
  });
});