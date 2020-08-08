const Connection = require('tedious').Connection;
const configSql = require("../config");

let _rows = [];

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
connection.on('connect', err => {
    // If no error, then good to proceed.
    if (err) {
        console.log('ERROR');
        console.log(err);
    } else {
        console.log("Connected");
        // executeStatement1();
        queryDatabase();
    }

});

const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;

function executeStatement1() {
    let request = new Request(
        `insert into nb_person (first_name, second_name, third_name, first_surname, second_surname, person_ci, status, 
        tx_user,tx_host, tx_date) values (@FirstName, @SecondName, @ThirdName, @FirstSurname, @SecondSurname, @PersonCi,
         @Status, @TxUser, @TxHost, @TxDate);`, err => {
            if (err) {
                console.log(err);
            }
        });
    request.addParameter('FirstName', TYPES.VarChar, 'Gael');
    request.addParameter('SecondName', TYPES.VarChar, 'Matt');
    request.addParameter('ThirdName', TYPES.VarChar, null);
    request.addParameter('FirstSurname', TYPES.VarChar, 'Quiroz');
    request.addParameter('SecondSurname', TYPES.VarChar, 'Castillo');
    request.addParameter('PersonCi', TYPES.VarChar, '5678890');
    request.addParameter('Status', TYPES.Int, 1);
    request.addParameter('TxUser', TYPES.VarChar, 'Admin');
    request.addParameter('TxHost', TYPES.VarChar, 'localhost');
    request.addParameter('TxDate', TYPES.DateTime, new Date());
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });
    connection.execSql(request);
}

function queryDatabase(table, id) {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `select * from ${table}`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}

function list(table, id) {
    return new Promise((resolve, reject) => {
        // Read all rows from table
        const request = new Request(
            `select * from ${table}`,
            (err, rowCount) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`${rowCount} row(s) returned`);
                }
            }
        );

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
    })
}

module.exports = {
    list
}

