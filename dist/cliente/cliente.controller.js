import { Cliente } from "./cliente.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
async function sanitizeClienteInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        telefono: req.body.telefono,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const clientes = await em.find(Cliente, {});
        res.status(200).json({ message: 'Todos los clientes encontrados', data: clientes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const cliente = await em.findOneOrFail(Cliente, { id });
        res.status(200).json({ message: 'Cliente encontrado', data: cliente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const cliente = em.create(Cliente, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Cliente creado', data: cliente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const clienteToUpdate = await em.findOneOrFail(Cliente, { id });
        em.assign(clienteToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Cliente actualizado', data: clienteToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const cliente = await em.findOneOrFail(Cliente, { id });
        em.removeAndFlush(cliente);
        res.status(200).json({ message: 'El cliente ha sido eliminado con éxito', data: cliente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeClienteInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=cliente.controller.js.map