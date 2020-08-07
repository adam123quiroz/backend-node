module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: 'noteSecret!'
    },
    mysql: {
        host: 'biucb.database.windows.net',
        user: 'adamquiroz',
        password: 'Arqui2020',
        database: 'db-node'
    }
}