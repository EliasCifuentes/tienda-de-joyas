import { text } from "express";
import pool from "../../db/config.js";
import format from 'pg-format'

//ESTRUCTURA HATEOAS
export const getJoyasModel = async () => {
    try {
        // Obtener el conteo total de joyas
        const totalJoyasQuery = await pool.query('SELECT COUNT(*) FROM inventario');
        const totalJoyas = parseInt(totalJoyasQuery.rows[0].count);

        // Obtener el stock total sumando todos los stocks
        const stockTotalQuery = await pool.query('SELECT SUM(stock) FROM inventario');
        const stockTotal = parseInt(stockTotalQuery.rows[0].sum);

        // Obtener todas las joyas con sus IDs
        const joyasQuery = await pool.query('SELECT id, nombre FROM inventario');
        const result = joyasQuery.rows.map(joya => ({
            name: joya.nombre,
            href: `joyas/joya/${joya.id}`
        }));

        return {
            totalJoyas,
            stockTotal,
            result
        };
    } catch (error) {
        console.error('Error en getJoyasModel:', error);
        throw new Error('Error al generar el HATEOAS de joyas');
    }
};

// ORDER, LIMIT Y PAGE
export const getPaginatedInventarioModel = async ({ order_by = 'id_ASC', limit = 3, page = 1 }) => {
    try {
        const [atribute, direction] = order_by.split('_')
        const offset = (page - 1) * limit

        const formatQuery = format(
            'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
            atribute,
            direction,
            limit,
            offset
        )
        const response = await pool.query(formatQuery)
        return response.rows
    } catch (error) {
        throw new Error('Error al obtener los inventarios desde la base de datos')
    }
}

// FILTROS
export const getFilterInventarioModel = async ({ precio_min, precio_max, categoria, metal }) => {
    try {
        const filtros = []
        const values = []
        let index = 1

        if (precio_min) {
            filtros.push(`precio >= $${index++}`)
            values.push(precio_min)
        }
        if (precio_max) {
            filtros.push(`precio <= $${index++}`)
            values.push(precio_max)
        }
        if (categoria) {
            filtros.push(`categoria = $${index++}`)
            values.push(categoria)
        }
        if (metal) {
            filtros.push(`metal = $${index++}`)
            values.push(metal)
        }

        let consulta = 'SELECT * FROM inventario'

        if (filtros.length > 0) {
            consulta += ' WHERE ' + filtros.join(' AND ')
        }

        const response = await pool.query(consulta, values)
        return response.rows
    } catch (error) {
        console.error(error)
        throw new Error('Error al obtener los filtros de inventario desde la base de datos')
    }
}