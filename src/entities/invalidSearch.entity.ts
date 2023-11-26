import { Column, Entity } from "typeorm";

import { CustomBaseEntity } from "./base.entity";

@Entity()
export class InvalidSearchEntity extends CustomBaseEntity {
  @Column()
  searchText: string;
}
