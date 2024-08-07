import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
const em = orm.em;
function sanitizeElaboracionPlato(req, res, next) {
    req.body.sanitizedElabPlato = {
        ingrediente: req.body.ingrediente,
        plato: req.body.plato,
        cantidad: req.body.cantidad
    };
    Object.keys(req.body.sanitizedElabPlato).forEach((keys) => {
        if (req.body.sanitizedElabPlato[keys] === undefined) {
            delete req.body.sanitizedElabPlato[keys];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const elabPlato = await em.find(ElaboracionPlato, {}, { populate: ['ingrediente'] });
        res.status(200).json({ message: 'La cantidades de los ingredientes para cada plato fueron encontradas con éxito', data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Mi idea es buscar cada elaboraciónPlato según su ingrediente y plato asociados (sólo puede haber una única instancia de "ElaboraciónPlato" para cada conjunto ingrediente-plato)
async function findOne(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        //const nro = Number.parseInt(req.body.nro)
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo }, { populate: ['tipoIngrediente'] });
        //const plato = await em.findOneOrFail(Plato, {codigo: nro}, {populate: ['tipoPlato']})
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { ingrediente /*, plato*/ }, { populate: ['ingrediente' /*, 'plato'*/] });
        res.status(200).json({ message: 'La cantidad del ingrediente para el plato seleccionado fue encontrada con éxito', data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const elabPlato = em.create(ElaboracionPlato, req.body.sanitizedElabPlato);
        await em.flush();
        res.status(201).json({ message: 'La cantidad del ingrediente para el plato seleccionado fue establecida con éxito', data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        //const nro = Number.parseInt(req.body.nro)
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        //const plato = await em.findOneOrFail(Plato, {codigo: nro})
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { ingrediente /*, plato*/ });
        em.assign(elabPlato, req.body.sanitizedElabPlato);
        em.flush();
        res.status(200).json({ message: 'La cantidad del ingrediente para el plato seleccionado ha sido actualizada con éxito', data: req.body.sanitizedElabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        //const nro = Number.parseInt(req.body.nro)
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        //const plato = await em.findOneOrFail(Plato, {codigo: nro})
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { ingrediente /*, plato*/ });
        em.removeAndFlush(elabPlato);
        res.status(200).json({ message: 'La cantidad del ingrediente para el plato seleccionado ha sido eliminada con éxito', data: elabPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeElaboracionPlato, findAll, findOne, add, update, remove };
//# sourceMappingURL=elaboracionPlato.controler.js.map