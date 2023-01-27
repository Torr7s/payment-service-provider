import { User } from '@prisma/client';

import { JwtPayload } from '@/core/@types';

export interface IAuthUseCase {
  signToken: (user: User) => string;
  verifyPayload: (payload: JwtPayload) => Promise<User>;
}