import { Entity, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseClass } from "../shared/db/baseEntity.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";

@Entity()
export class TipoIngrediente extends BaseClass{

  @Property({nullable: false, unique: true})
  descTIngre!: string

  @Property({nullable: false})
  unidadMedida!: string

  @OneToMany(() => Ingrediente, (ingrediente) => ingrediente.tipoIngrediente, {cascade: [Cascade.ALL]})
  ingredientes = new Collection<Ingrediente>(this)
}