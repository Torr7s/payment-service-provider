import { User } from '@prisma/client';

import { JwtPayload } from '@/core/@types';

export interface IAuthAuthenticateUseCase {
  signToken: (user: User) => string;
  verifyPayload: (payload: JwtPayload) => Promise<User>;
}