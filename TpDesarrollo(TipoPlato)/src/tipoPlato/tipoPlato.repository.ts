import { repository } from "../shared/repository.js";
import { TipoPlato } from "./tipoPlato.entity.js";



const tipoPlatos=[
  new TipoPlato(
    'Fideos al pesto',
    'Principal',
    'sdnunae-sdead-aed23-d23de3-4hsha'
  )
]


export class TipoPlatoRepository implements repository<TipoPlato>{

  public findAll(): TipoPlato[] | undefined {
    return tipoPlatos
  }
  public findOne(item: { id: string; }): TipoPlato | undefined {
    return tipoPlatos.find((tipoPlato) =>tipoPlato.id===item.id)
  }
  public add(item: TipoPlato): TipoPlato | undefined {
    tipoPlatos.push(item)
    return item
  }

  public update(item: TipoPlato): TipoPlato | undefined {
      const tipoPlatoIdx = tipoPlatos.findIndex((tipoPlato) => tipoPlato.id === item.id)
      if (tipoPlatoIdx !== -1) {
       tipoPlatos[tipoPlatoIdx] = {...tipoPlatos[tipoPlatoIdx], ...item}
     }
     return tipoPlatos[tipoPlatoIdx]
  }
  
  public delete(item: { id: string; }): TipoPlato | undefined {
    const tipoPlatoIdx = tipoPlatos.findIndex((tipoPlato) =>tipoPlato.id===item.id)
    if(tipoPlatoIdx!==-1){
      const deleteTipoPlato = tipoPlatos[tipoPlatoIdx]
      tipoPlatos.splice(tipoPlatoIdx,1)
      return deleteTipoPlato 
    }
  } 
}