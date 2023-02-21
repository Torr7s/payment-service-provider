import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  fullName: string;
  email: string;
  password: string;
}