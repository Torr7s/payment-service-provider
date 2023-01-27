import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public serializeUser(
    user: User,
    done: (err: Error | null, id?: User) => void
  ): void {
    done(null, user);
  }

  public deserializeUser(
    payload: unknown,
    done: (err: Error | null, payload?: unknown) => void
  ): void {
    done(null, payload);
  }
}