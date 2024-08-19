import { Entity, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseClass1 } from "../shared/db/baseEntity.entity.js";
import { Plato } from "../plato/plato.entity.js";

@Entity()
export class TipoPlato extends BaseClass1{

  @Property({nullable: false, unique: true})
  descTPlato!: string

  @OneToMany(() => Plato, (plato) => plato.tipoPlato, {cascade: [Cascade.ALL]})
  platos = new Collection<Plato>(this)
}