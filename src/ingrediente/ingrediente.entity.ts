import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection } from '@mikro-orm/core'
import { TipoIngrediente } from '../tipoIngrediente/tipoIngrediente.entity.js'
import { BaseClass } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Ingrediente extends BaseClass {

  @Property()
  descIngre!: string

  @Property()
  stockIngre!: number

  @Property()
  puntoDePedido!: number

  @ManyToOne(() => TipoIngrediente, {nullable: false})
  tipoIngrediente!: Rel<TipoIngrediente>
}