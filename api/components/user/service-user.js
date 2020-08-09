const TABLE = 'nb_user';
const auth = require('../auth');
const { nanoid } = require('nanoid');

module.exports = injectedStore => {
    let dao = injectedStore;
    if (!dao) {
        dao = require("../../../dao/sql-dao");
    }

    function list() {
        return dao.list(TABLE);
    }

    function getById(id) {
        return dao.get(TABLE, id);
    }

    async function upsert(user) {
        return new Promise((resolve, reject) => {
            let newUser;
            let id;
            if (!user.name) {
                reject('Data is incomplete');
            }
            if (user.id) {
                id = user.id;
            } else {
                id = nanoid();
            }
            newUser = {
                id: id,
                name: user.name,
                username: user.username,
                password: user.password
            }
            if (user.username || user.password) {
                resolve(
                    auth.upsert({
                        id: newUser.id,
                        username: newUser.username,
                        password: newUser.password
                    })
                )
            }
            resolve(dao.upsert(TABLE, newUser));

        })
    }

    return {
        list,
        getById,
        upsert
    }
}