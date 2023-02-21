import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserEntity } from '@/app/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public serializeUser(user: UserEntity, done: (err: Error | null, id?: UserEntity) => void): void {
    done(null, user);
  }

  public deserializeUser(payload: unknown, done: (err: Error | null, payload?: unknown) => void): void {
    done(null, payload);
  }
}