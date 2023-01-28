import { UserEntity } from './user.entity';

export class ConsumerEntity {
  id?: string;
  userProfile?: UserEntity;
  transactions?: Array<any>;
  payables?: Array<any>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}