import { BeforeCreate, DateType, Entity, Index, ManyToOne, PrimaryKeyType, Property, Rel, TimeType } from "@mikro-orm/core";
import { Bebida } from "../bebida.entity.js";
import { Pedido } from "../../pedido/pedido.entity.js";

@Index({properties: ['bebida', 'pedido', 'fechaSolicitud', 'horaSolicitud']})
@Entity()
export class BebidaPedido {

  [PrimaryKeyType]?: [number, number]

  @ManyToOne(() => Bebida, { nullable: false, primary: true })
  bebida!: Rel<Bebida>

  @ManyToOne(() => Pedido, { nullable: false, primary: true })
  pedido!: Rel<Pedido>

  @Property({ nullable: false, primary: true, type: DateType })
  fechaSolicitud?: Date

  @Property({ nullable: false, primary: true, type: TimeType })
  horaSolicitud?: string

  @Property({ nullable: false })
  cantidad!: number

  @Property()
  entregado?: boolean = false

  @BeforeCreate()
  establecerFechaYHora() {
    this.fechaSolicitud = new Date()
    this.horaSolicitud = (new Date()).toTimeString().split(' ')[0]
  }
}