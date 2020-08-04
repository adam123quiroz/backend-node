const db = {
    user: [
        {
            id: '1',
            name: 'Adam'
        }
    ]
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(value => value.id === id[0] || null);
}

async function query(table, q) {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(value => value[key] === q[key])[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
}

module.exports = {
    list,
    get,
    upsert,
    query
}