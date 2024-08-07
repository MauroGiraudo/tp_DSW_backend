import { Repository } from "../shared/repository.js";
import { TipoIngrediente } from './tipoIngrediente.entity.js'

  const tiposIngrediente = [
  new TipoIngrediente(
    'b780c4c6-68c2-4177-8371-af0102a99d38',
    'Verdura',
    'Gramos'
    )
  ]

export class TipoIngredienteRepository implements Repository<TipoIngrediente> {
  
  public findAll(): TipoIngrediente[] | undefined {
    return tiposIngrediente
  }

  public findOne(item: { codigo: string; }): TipoIngrediente | undefined {
    return tiposIngrediente.find((tIngrediente) => tIngrediente.codigo === item.codigo)
  }

  public add(item: TipoIngrediente): TipoIngrediente | undefined {
    tiposIngrediente.push(item)
    return item
  }

  public update(item: TipoIngrediente): TipoIngrediente | undefined {
    const tIngredienteIndex = tiposIngrediente.findIndex((tIngrediente) => tIngrediente.codigo === item.codigo)
    if (tIngredienteIndex !== -1) {
      tiposIngrediente[tIngredienteIndex] = { ...tiposIngrediente[tIngredienteIndex], ...item }
    } 
    return tiposIngrediente[tIngredienteIndex]
  }

  public delete(item: { codigo: string; }): TipoIngrediente | undefined {
    const tIngredienteIndex = tiposIngrediente.findIndex((tIngrediente) => tIngrediente.codigo === item.codigo)

    if (tIngredienteIndex !== -1) {
      const deletedTiposIngres = tiposIngrediente[tIngredienteIndex]
      tiposIngrediente.splice(tIngredienteIndex, 1)
      return deletedTiposIngres
    }
  }
}