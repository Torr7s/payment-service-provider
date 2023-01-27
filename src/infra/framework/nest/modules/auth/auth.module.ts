import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';

import { AuthModuleProviders } from '../../ioc/providers/auth.providers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: AuthModuleProviders
})
export class AuthModule {}