const auth = require("../../../auth");
const bcrypt = require('bcrypt');
const TABLE = 'auth';

module.exports = injectedStore => {
    let dao = injectedStore;
    if (!dao) {
        dao = require("../../../dao/sql-dao");
    }

    async function login(username, password) {
        const data = await dao.query(TABLE, {username: username});
        return bcrypt.compare(password, data.password)
            .then(value => {
                if (value === true) {
                    return auth.sign(data);
                }
                throw new Error('Data invalid')
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }
        if (data.username) {
            authData.username = data.username;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return dao.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    }
}