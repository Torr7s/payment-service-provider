import { BaseEntity } from './base.entity';
import { ConsumerEntity } from './consumer.entity';

export class UserEntity extends BaseEntity {
  fullName: string;
  email: string;
  password: string;
  consumerProfile?: ConsumerEntity;
}