import crypto from 'node:crypto'


export class Plato{
  constructor(
    public name: string,
    public platoClass: string,
    public level: number,
    public hp: number,
    public mana: number,
    public attack: number,
    //public items: string[],
    public id= crypto.randomUUID()
  ){}
}