import { Collection, DecimalType, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseClass7 } from '../shared/db/baseEntity.entity.js'
import { BebidaPedido } from "./bebidaPedido/bebidaPedido.entity.js";
import { BebidaDeProveedor } from "./bebidaDeProveedor/bebidaDeProveedor.entity.js";


@Entity()
export class Bebida extends BaseClass7 {

  @Property({ nullable: false })
  descripcion!: string

  @Property({ nullable: false })
  unidadMedida!: string

  @Property({ nullable: false })
  contenido!: number

  @Property({ nullable: false })
  precio!: number

  @OneToMany(() => BebidaPedido, (bebidaPedido) => bebidaPedido.bebida)
  bebidasPedido = new Collection<BebidaPedido>(this)

  @OneToMany(() => BebidaDeProveedor, (bebidaDeProveedor) => bebidaDeProveedor.bebida)
  bebidasDeProveedor = new Collection<BebidaDeProveedor>(this)
}