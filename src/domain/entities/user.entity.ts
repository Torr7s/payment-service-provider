export class UserEntity {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  consumerProfile?: object;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}