import { Entity, Property, Collection, Cascade, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseClass2 } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Cliente extends BaseClass2{
  @Property({nullable : false})
  nombre!: string
  @Property({nullable : false})
  apellido!: string
  @Property({nullable : false})
  mail!: string
  @Property({nullable : false})
  telefono!: number
}