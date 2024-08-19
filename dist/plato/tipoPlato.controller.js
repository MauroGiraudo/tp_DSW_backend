import { TipoPlato } from './tipoPlato.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
em.getRepository(TipoPlato);
async function findAll(req, res) {
    try {
        const tiposPlato = await em.find(TipoPlato, {});
        res.status(200).json({ message: 'Todos los tipos de plato fueron encontrados', data: tiposPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const numTipoPlato = Number.parseInt(req.params.numPlato);
        const tipoPlato = await em.findOneOrFail(TipoPlato, { numPlato: numTipoPlato });
        res.status(200).json({ message: 'El tipo de plato fue encontrado con éxito', data: tipoPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const tipoPlato = em.create(TipoPlato, req.body);
        await em.flush(),
            res.status(201).json({ message: 'El tipo de plato fue creado con éxito', data: tipoPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.numPlato);
        const tipoPlato = await em.findOneOrFail(TipoPlato, { numPlato });
        em.assign(tipoPlato, req.body);
        em.flush();
        res.status(200).json({ message: 'El tipo de plato fue actualizado con éxito', data: tipoPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.numPlato);
        const deletedTipoPlato = await em.findOneOrFail(TipoPlato, { numPlato });
        await em.removeAndFlush(deletedTipoPlato);
        res.status(200).json({ message: 'El tipo de plato ha sido eliminado con éxito', data: deletedTipoPlato });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=tipoPlato.controller.js.map