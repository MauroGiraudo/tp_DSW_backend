import crypto from 'node:crypto';
export class Ingrediente {
    constructor(codIngrediente = crypto.randomUUID(), descIngrediente, stockIngrediente, puntoPedido, tipoIngrediente) {
        this.codIngrediente = codIngrediente;
        this.descIngrediente = descIngrediente;
        this.stockIngrediente = stockIngrediente;
        this.puntoPedido = puntoPedido;
        this.tipoIngrediente = tipoIngrediente;
    }
}
//# sourceMappingURL=ingrediente.entity.js.map