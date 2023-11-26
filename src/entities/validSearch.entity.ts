import { Column, Entity } from "typeorm";

import { CustomBaseEntity } from "./base.entity";

@Entity()
export class ValidSearchEntity extends CustomBaseEntity {
  @Column()
  searchText: string;
}
