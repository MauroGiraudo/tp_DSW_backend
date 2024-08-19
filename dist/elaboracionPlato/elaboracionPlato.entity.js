var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { Plato } from "../plato/plato.entity.js";
export let ElaboracionPlato = class ElaboracionPlato {
};
__decorate([
    ManyToOne(() => Ingrediente, { primary: true }),
    __metadata("design:type", Object)
], ElaboracionPlato.prototype, "ingrediente", void 0);
__decorate([
    ManyToOne(() => Plato, { primary: true }),
    __metadata("design:type", Object)
], ElaboracionPlato.prototype, "plato", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], ElaboracionPlato.prototype, "fechaVigencia", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], ElaboracionPlato.prototype, "cantidadNecesaria", void 0);
ElaboracionPlato = __decorate([
    Entity()
], ElaboracionPlato);
//# sourceMappingURL=elaboracionPlato.entity.js.map