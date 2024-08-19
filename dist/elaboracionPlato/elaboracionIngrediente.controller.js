import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
import { Plato } from "../plato/plato.entity.js";
const em = orm.em;
function sanitizeElaboracionIngrediente(req, res, next) {
    req.body.sanitizedElaboracionIngrediente = {
        ingrediente: req.params.cod,
        plato: req.body.plato,
        fechaVigencia: req.body.fechaVigencia,
        cantidadNecesaria: req.body.cantidadNecesaria
    };
    Object.keys(req.body.sanitizedElaboracionIngrediente).forEach((keys) => {
        if (req.body.sanitizedElaboracionIngrediente[keys] === undefined) {
            delete req.body.sanitizedElaboracionIngrediente[keys];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo }, { populate: ['tipoIngrediente'] });
        const elabPlato = await em.find(ElaboracionPlato, { ingrediente }, { populate: ['plato', 'ingrediente'] });
        res.status(200).json({ message: `La cantidades del ingrediente ${ingrediente.descIngre} para cada plato en el que se utiliza fueron encontradas con éxito`, data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        req.body.sanitizedElaboracionIngrediente.ingrediente = await em.findOneOrFail(Ingrediente, { codigo: Number.parseInt(req.body.sanitizedElaboracionIngrediente.ingrediente) });
        const elabIngre = em.create(ElaboracionPlato, req.body.sanitizedElaboracionIngrediente);
        await em.flush();
        res.status(201).json({ data: elabIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const codigo = Number.parseInt(req.params.cod);
        const plato = await em.findOneOrFail(Plato, { numPlato });
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        const elabIngre = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente });
        em.assign(elabIngre, req.body.sanitizedElaboracionIngrediente);
        em.flush();
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido actualizada exitosamente`, data: elabIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const codigo = Number.parseInt(req.params.cod);
        const plato = await em.findOneOrFail(Plato, { numPlato });
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        const elabIngre = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente });
        em.removeAndFlush(elabIngre);
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido eliminada exitosamente`, data: elabIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeElaboracionIngrediente, findAll, add, update, remove };
//# sourceMappingURL=elaboracionIngrediente.controller.js.map