const { Connection, Request } = require('tedious');
const configDB = require('../config');

// Create connection to database
const config = {
    server: configDB.mysql.host, // update me
    authentication: {
        options: {
            userName: configDB.mysql.user, // update me
            password: configDB.mysql.password // update me
        },
        type: "default"
    },
    options: {
        database: configDB.mysql.database, //update me
        encrypt: true
    }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        // queryDatabase();
    }
});

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `SELECT TOP 20 pc.Name as CategoryName,
                   p.name as ProductName
     FROM [SalesLT].[ProductCategory] pc
     JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`,
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