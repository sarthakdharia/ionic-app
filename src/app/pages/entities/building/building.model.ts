import { BaseEntity } from 'src/model/base-entity';
import { Address } from '../address/address.model';
import { User } from '../../../services/user/user.model';

export class Building implements BaseEntity {
  constructor(
    public id?: number,
    public category?: string,
    public name?: string,
    public floors?: number,
    public createdOn?: any,
    public updatedOn?: any,
    public address?: Address,
    public createdBy?: User,
    public updatedBy?: User
  ) {}
}
