import { getPaginatedInventarioModel, getFilterInventarioModel, getJoyasModel } from "../models/joyasModel.js";

//HATEOAS
export const getJoyas = async (req, res, next) => {
    try {
        const reporte = await getJoyasModel();

        //Estructura HATEOAS solicitada
        const response = {
            totalJoyas: reporte.totalJoyas,
            stockTotal: reporte.stockTotal,
            result: reporte.result
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
};

// GET ORDER, LIMIT, PAGE
export const pageInventario = async (req, res, next) => {
    try {
        const { order_by = 'id_ASC', limit = 3, page = 1 } = req.query
        const inventario = await getPaginatedInventarioModel({
            order_by,
            limit: Number(limit),
            page: Number(page)
        })
        res.status(200).json(inventario)
    } catch (error) {
        next(error)
    }
}

// FILTER
export const inventarioFilter = async (req, res, next) => {
    try {
        const filters = req.query
        const inventario = await getFilterInventarioModel(filters)
        res.status(200).json(inventario)
    } catch (error) {
        next(error)
    }
}