import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum Status {
  'PERFECT',
  'MINOR',
  'MAINTAINENCE',
  'MAJOR',
  'OUT_OF_USE',
}

export class MechanicalMachines implements BaseEntity {
  constructor(
    public id?: number,
    public machineName?: string,
    public machineBrand?: string,
    public machineType?: string,
    public warranty?: any,
    public capacity?: number,
    public length?: number,
    public width?: number,
    public height?: number,
    public status?: Status,
    public createdOn?: any,
    public updatedOn?: any,
    public createdBy?: User,
    public updatedBy?: User
  ) {}
}
