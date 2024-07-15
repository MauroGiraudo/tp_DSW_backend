import { repository } from "../shared/repository.js";
import { Plato } from "./plato.entity.js";



const platos=[
  new Plato(
    'Sevastian Villa',
    'Luchador',
    15,
    1000,
    6000,
    1000,
    //['Boca', 'Vilaaaaaaa'],
    'fffros453od-sdasdd44-da453dad-3hdfdg33-dd6565d-dddd88',
  )
]
export class PlatoRepository implements repository<Plato>{

  public findAll(): Plato[] | undefined {
    return platos
  }
  public findOne(item: { id: string; }): Plato | undefined {
    return platos.find((plato) =>plato.id===item.id)
  }
  public add(item: Plato): Plato | undefined {
    platos.push(item)
    return item
  }

  public update(item: Plato): Plato | undefined {
      const platoIdx = platos.findIndex((plato) => plato.id === item.id)
      if (platoIdx !== -1) {
       platos[platoIdx] = {...platos[platoIdx], ...item}
     }
     return platos[platoIdx]
  }
  
  public delete(item: { id: string; }): Plato | undefined {
    const platoIdx = platos.findIndex((plato) =>plato.id===item.id)
    if(platoIdx!==-1){
      const deletePlato = platos[platoIdx]
      platos.splice(platoIdx,1)
      return deletePlato
    }
  } 
}