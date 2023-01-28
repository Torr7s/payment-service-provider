import { ConsumerEntity } from './consumer.entity';

export class UserEntity {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  consumerProfile?: ConsumerEntity;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}