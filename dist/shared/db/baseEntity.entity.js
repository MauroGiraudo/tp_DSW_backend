var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrimaryKey } from "@mikro-orm/core";
export class BaseClass {
}
__decorate([
    PrimaryKey(),
    __metadata("design:type", Number)
], BaseClass.prototype, "codigo", void 0);
export class BaseClass1 {
}
__decorate([
    PrimaryKey(),
    __metadata("design:type", Number)
], BaseClass1.prototype, "numPlato", void 0);
export class BaseClass2 {
}
__decorate([
    PrimaryKey(),
    __metadata("design:type", Number)
], BaseClass2.prototype, "id", void 0);
//# sourceMappingURL=baseEntity.entity.js.map