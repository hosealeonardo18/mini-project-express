const db = require('../db');
const config = require('../config/app');

const table = 'products';

const findAll = async (search = '') => {
    const query = db(table).select('id', 'name', 'price', 'stock', 'created_at', 'updated_at');

    if (search) {
        query.whereRaw('LOWER(name) LIKE ?', [`%${search.toLowerCase()}%`]);
    }

    return query;
}

const find = async (id) => {
    return db(table).select('id', 'name', 'price', 'stock', 'created_at', 'updated_at').where({ id }).first();;
}

const store = async (payload) => {
    const [id] = await db(table).insert(payload);

    return db(table)
        .where({ id })
        .first();
}

const update = async (id, payload) => {
    await db(table)
        .where({ id })
        .update(payload);

    return db(table)
        .where({ id })
        .first();
}

const destroy = async (id) => {
    return db(table)
        .where({ id })
        .delete();
}

module.exports = { findAll, find, store, update, destroy };