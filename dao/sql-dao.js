const Connection = require('tedious').Connection;
const configSql = require("../config");
const {addUser} = require("./sql-queries");
const Request = require('tedious').Request;

const config = {
    server: configSql.mysql.host,  //update me
    authentication: {
        type: 'default',
        options: {
            userName: configSql.mysql.user, //update me
            password: configSql.mysql.password  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: configSql.mysql.database  //update me
    }
};

const connection = new Connection(config);

let _rows = [];



connection.on('connect', err => {
    // If no error, then good to proceed.
    if (err) {
        console.log('ERROR');
        console.log(err);
    } else {
        console.log("Connected");
        upsert('nb_user');
    }

});

function upsert(table, data) {
    const pp = {
        firstName: 'Lionel',
        firstSurname: 'Messi',
        personCi: '124513',
        username: 'lio10',
        password: '12345'
    }
    addUser(table, pp, connection);
}


function list(table) {
    return new Promise((resolve, reject) => {
        // Read all rows from table
        const request = new Request(
            `select * from ${table}`,
            (err) => {
                if (err) {
                    reject(err);
                }
            }
        );
        _jsonFormat(request, resolve);
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        const request = new Request(
            `select * 
            from ${table} a, nb_person b 
            where a.person_id = b.person_id 
            and a.user_id = ${id}`,
            (err) => {
                if (err) {
                    reject(err);
                }
            }
        );
        _jsonFormat(request, resolve);
    });
}

function _jsonFormat(request, resolve) {
    _rows = [];
    request.on("row", columns => {
        let _item = {};
        // Converting the response row to a JSON formatted object: [property]: value
        columns.forEach(column => {
            _item[column.metadata.colName] = column.value;
        });
        _rows.push(_item);
    });
    request.on("doneInProc", (rowCount, more, rows) => {
        resolve(_rows);
    });
    connection.execSql(request);
}

module.exports = {
    list,
    get,
    upsert
}

