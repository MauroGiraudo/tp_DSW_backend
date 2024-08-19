var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { TipoIngrediente } from './tipoIngrediente.entity.js';
import { BaseClass } from '../shared/db/baseEntity.entity.js';
import { ElaboracionPlato } from '../elaboracionPlato/elaboracionPlato.entity.js';
export let Ingrediente = class Ingrediente extends BaseClass {
    constructor() {
        super(...arguments);
        this.elaboracionesPlato = new Collection(this);
    }
};
__decorate([
    Property(),
    __metadata("design:type", String)
], Ingrediente.prototype, "descIngre", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Ingrediente.prototype, "stockIngre", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Ingrediente.prototype, "puntoDePedido", void 0);
__decorate([
    ManyToOne(() => TipoIngrediente, { nullable: false }),
    __metadata("design:type", Object)
], Ingrediente.prototype, "tipoIngrediente", void 0);
__decorate([
    OneToMany(() => ElaboracionPlato, (elaboracionPlato) => elaboracionPlato.ingrediente, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Ingrediente.prototype, "elaboracionesPlato", void 0);
Ingrediente = __decorate([
    Entity()
], Ingrediente);
//# sourceMappingURL=ingrediente.entity.js.map