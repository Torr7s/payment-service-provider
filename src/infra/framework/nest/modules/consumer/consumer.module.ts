import { Module } from '@nestjs/common';

import { ConsumerController } from './consumer.controller';

import { ConsumerModuleProviders } from '../../ioc/providers/consumer.providers';

@Module({
  controllers: [ConsumerController],
  providers: ConsumerModuleProviders
})
export class ConsumerModule {}