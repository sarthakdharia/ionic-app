import { BaseEntity } from 'src/model/base-entity';

export class Address implements BaseEntity {
  constructor(
    public id?: number,
    public street?: string,
    public area?: string,
    public city?: string,
    public state?: string,
    public country?: string,
    public postalCode?: number,
    public location?: string,
    public createdOn?: any
  ) {}
}
