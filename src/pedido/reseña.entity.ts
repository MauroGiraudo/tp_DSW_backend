import { Entity, Property, OneToOne, Rel, PrimaryKeyType, DateTimeType } from "@mikro-orm/core"
import { Pedido } from "./pedido.entity.js"

@Entity()
export class Resena {

  @OneToOne(() => Pedido, {primary: true})
  pedido!: Rel<Pedido>

  @Property({nullable: false, type: DateTimeType, onCreate: () => new Date()})
  fechaHoraResena!: Date

  @Property({type: DateTimeType, onUpdate: () => new Date()})
  fechaHoraModificacion?: Date

  @Property({nullable: false})
  cuerpo!: string

  @Property({nullable: false})
  puntaje!: number

  [PrimaryKeyType]?: [number, Date]
}