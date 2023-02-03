import { AuthSignUpUseCase } from './sign-up.use-case';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { AuthSignUpInput, AuthSignUpOutput } from '@/domain/use-cases/auth';

import { UserInMemoryRepository } from '@/infra/database/prisma/repositories/in-memory/user-memory.repository';
import { AuthException } from '@/app/exceptions/auth.exception';

describe('AuthSignUpUseCase', (): void => {
  let userRepository: UserRepository;
  let authSignUpUseCase: AuthSignUpUseCase

  const fullName = 'John Doe';
  const email = 'johndoe@example.com';
  const password = 'youshallnotpass';

  beforeEach((): void => {
    userRepository = new UserInMemoryRepository();
    authSignUpUseCase = new AuthSignUpUseCase(userRepository);
  });

  it('should be defined', (): void => {
    expect(authSignUpUseCase).toBeDefined();
  });

  it('should create a user', async (): Promise<void> => {
    const input: AuthSignUpInput = {
      fullName,
      email,
      password
    }

    const output: AuthSignUpOutput = await authSignUpUseCase.exec(input);

    expect(output.user.fullName).toEqual(input.fullName);
    expect(output.user.email).toEqual(input.email);

    expect(
      userRepository.findOne({
        email: input.email
      })
    ).resolves.toBe(output.user);
  });
});