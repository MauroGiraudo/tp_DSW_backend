import { Cascade, Entity, ManyToOne, PrimaryKeyType, Property, Rel } from "@mikro-orm/core";
import { BaseClass } from "../shared/db/baseEntity.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { Plato } from "../plato/plato.entity.js";

@Entity()
export class ElaboracionPlato {

  @ManyToOne(() => Ingrediente, {primary: true})
  ingrediente!: Rel<Ingrediente>

  @ManyToOne(() => Plato, {primary: true})
  plato!: Rel<Plato>

  @Property()
  fechaVigencia!: string

  @Property()
  cantidadNecesaria!: number

  [PrimaryKeyType]?: [number, number]
} 