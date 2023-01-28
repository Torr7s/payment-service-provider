import { SignInDto } from '@/domain/dtos/authentication/sign-in.dto';

import { UserEntity } from '@/domain/entities/user.entity';

export interface IAuthSignInUseCase {
  exec: (signInDto: SignInDto) => Promise<UserEntity>;
}