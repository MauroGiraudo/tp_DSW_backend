import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "./ingrediente.entity.js";
const em = orm.em;
function sanitizeIngrediente(req, res, next) {
    req.body.sanitizedIngrediente = {
        codIngrediente: req.body.codIngrediente,
        descIngrediente: req.body.descIngrediente,
        stockIngrediente: req.body.stockIngrediente,
        puntoPedido: req.body.puntoPedido,
        tipoIngrediente: req.body.tipoIngrediente
    };
    Object.keys(req.body.sanitizedIngrediente).forEach((keys) => {
        if (req.body.sanitizedIngrediente[keys] === undefined) {
            delete req.body.sanitizedIngrediente[keys];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const ingre = await em.find(Ingrediente, {}, { populate: ['tipoIngrediente'] });
        res.status(200).json({ message: 'Todos los ingredientes fueron encontrados con éxito', data: ingre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        const ingre = await em.findOneOrFail(Ingrediente, { codigo }, { populate: ['tipoIngrediente'] });
        res.status(200).json({ message: 'El ingrediente fue hallado con éxito', data: ingre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const ingre = em.create(Ingrediente, req.body.sanitizedIngrediente);
        await em.flush();
        res.status(201).json({ message: 'El ingrediente fue creado con éxito', data: ingre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        const ingre = await em.findOneOrFail(Ingrediente, { codigo });
        em.assign(ingre, req.body.sanitizedIngrediente);
        em.flush();
        res.status(200).json({ message: 'El ingrediente ha sido actualizado con éxito', data: req.body.sanitizedIngrediente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        const ingre = await em.findOneOrFail(Ingrediente, { codigo });
        em.removeAndFlush(ingre);
        res.status(200).json({ message: 'El ingrediente ha sido eliminado con éxito', data: ingre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeIngrediente, findAll, findOne, add, update, remove };
//# sourceMappingURL=ingrediente.controler.js.map