import { Cascade, Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";

@Entity()
export class ElaboracionPlato {

  @ManyToOne(() => Ingrediente, { nullable: false })
  ingrediente!: Rel<Ingrediente>

  /*
  @ManyToOne(() => Plato, { nullable: false })
  plato!: Rel<Plato>
  */

  @Property()
  cantidad!: number

}