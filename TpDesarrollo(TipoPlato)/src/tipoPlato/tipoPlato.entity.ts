import crypto from 'node:crypto'


export class TipoPlato{
  constructor(
    public name: string,
    public tipoPlatoClass: string,
    public id= crypto.randomUUID()
  ){}
}