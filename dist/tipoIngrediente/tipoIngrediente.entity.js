var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseClass } from "../shared/db/baseEntity.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
export let TipoIngrediente = class TipoIngrediente extends BaseClass {
    constructor() {
        super(...arguments);
        this.ingredientes = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], TipoIngrediente.prototype, "descripcion", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], TipoIngrediente.prototype, "unidadMedida", void 0);
__decorate([
    OneToMany(() => Ingrediente, (ingrediente) => ingrediente.tipoIngrediente, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], TipoIngrediente.prototype, "ingredientes", void 0);
TipoIngrediente = __decorate([
    Entity()
], TipoIngrediente);
//# sourceMappingURL=tipoIngrediente.entity.js.map