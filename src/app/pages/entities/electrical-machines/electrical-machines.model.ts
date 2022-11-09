import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum Status {
  'PERFECT',
  'MINOR',
  'MAINTAINENCE',
  'MAJOR',
  'OUT_OF_USE',
}

export class ElectricalMachines implements BaseEntity {
  constructor(
    public id?: number,
    public equipmentName?: string,
    public equipmentBrand?: string,
    public equipmentType?: string,
    public warranty?: any,
    public batteryCapacity?: number,
    public status?: Status,
    public createdOn?: any,
    public updatedOn?: any,
    public createdBy?: User,
    public updatedBy?: User
  ) {}
}
