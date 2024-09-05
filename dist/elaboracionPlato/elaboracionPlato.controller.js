import { orm } from "../shared/db/orm.js";
import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
import { Plato } from "../plato/plato.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
const em = orm.em;
async function sanitizeElaboracionPlato(req, res, next) {
    //console.log(`unsanitized: ${JSON.stringify(req.body)}`)
    req.body.sanitizedElaboracionPlato = {
        ingrediente: req.body.ingrediente,
        plato: req.params.nro,
        cantidadNecesaria: req.body.cantidadNecesaria
    };
    Object.keys(req.body.sanitizedElaboracionPlato).forEach((keys) => {
        if (req.body.sanitizedElaboracionPlato[keys] === undefined) {
            delete req.body.sanitizedElaboracionPlato[keys];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const plato = await em.findOneOrFail(Plato, { numPlato }, { populate: ['tipoPlato'] });
        const elabPlato = await em.find(ElaboracionPlato, { plato }, { populate: ['ingrediente', 'plato'] });
        res.status(200).json({ message: `La cantidades de los ingredientes del plato ${plato.descripcion} fueron encontradas con éxito`, data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const codigo = Number.parseInt(req.params.cod);
        const plato = await em.findOneOrFail(Plato, { numPlato }, { populate: ['tipoPlato'] });
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente }, { populate: ['plato', 'ingrediente'] });
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido encontrada con éxito`, data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        //req.body.sanitizedElaboracionPlato.plato = await em.findOne(Plato, {numPlato: req.body.sanitizedElaboracionPlato.plato})
        const elabPlato = em.create(ElaboracionPlato, req.body.sanitizedElaboracionPlato);
        await em.flush();
        res.status(201).json({ data: elabPlato });
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
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente });
        em.assign(elabPlato, req.body.sanitizedElaboracionPlato);
        em.flush();
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido actualizada exitosamente`, data: elabPlato });
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
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente });
        em.removeAndFlush(elabPlato);
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido eliminada con éxito`, data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeElaboracionPlato, findAll, findOne, add, update, remove };
//# sourceMappingURL=elaboracionPlato.controller.js.map