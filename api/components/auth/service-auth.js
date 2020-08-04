const auth = require("../../../auth");
const TABLE = 'auth';

module.exports = injectedStore => {
    let dao = injectedStore;
    if (!dao) {
        dao = require("../../../dao/dummy");
    }
    
    async function login(username, password) {
        const data = await dao.query(TABLE, { username: username });
        if (data.password === password) {
            //TODO: generate token
            return auth.sign(data);
        } else {
            throw new Error('Data invalid')
        }
        return data;
    }
    
    function upsert(data) {
        const authData = {
            id: data.id
        }
        if (data.username) {
            authData.username = data.username;
        }
        if (data.password) {
            authData.password = data.password;
        }
        return dao.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    }
}