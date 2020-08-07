const Connection = require('tedious').Connection;
const configSql = require("../config");

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
        database: configSql.mysql.password  //update me
    }
};
const connection = new Connection(config);
connection.on('connect', err => {
    // If no error, then good to proceed.
    console.log("Connected");
    executeStatement1();
});

const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;

function executeStatement1() {
    let request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate)" +
        " OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function(err) {
        if (err) {
            console.log(err);}
    });
    request.addParameter('Name', TYPES.NVarChar,'SQL Server Express 2014');
    request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2014');
    request.addParameter('Cost', TYPES.Int, 11);
    request.addParameter('Price', TYPES.Int,11);
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });
    connection.execSql(request);
}