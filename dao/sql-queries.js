const addDataSystemInside = require("../utils/utlis-database");
const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;


person = {
    firstName: String,
    secondName: String,
    thirdName: String,
    firstSurname: String,
    secondSurname: String,
    personCi: String,

}

user = {
    personId: String,
    username: String,
    password: String

}

function executeQueryInsertPerson(table, person, connection) {
    return new Promise((resolve, reject) => {
        let request = new Request(
            `insert into ${table} (first_name, second_name, third_name, first_surname, second_surname, person_ci, status, 
        tx_user,tx_host, tx_date) values (@FirstName, @SecondName, @ThirdName, @FirstSurname, @SecondSurname, @PersonCi,
         @Status, @TxUser, @TxHost, @TxDate); select @@identity`, err => {
                if (err) {
                    reject(err);
                }
            });
        request.addParameter('FirstName', TYPES.VarChar, person.firstName);
        request.addParameter('SecondName', TYPES.VarChar, person.secondName);
        request.addParameter('ThirdName', TYPES.VarChar, person.thirdName);
        request.addParameter('FirstSurname', TYPES.VarChar, person.firstSurname);
        request.addParameter('SecondSurname', TYPES.VarChar, person.secondSurname);
        request.addParameter('PersonCi', TYPES.VarChar, person.personCi);
        addDataSystemInside(request, TYPES);

        request.on('row', function (columns) {
            resolve(columns[0].value);
        });
        connection.execSql(request);
    });
}

async function executeQueryInsertUser(table, user, connection) {

    let person = {
        firstName: user.firstName,
        secondName: user.secondName,
        thirdName: user.thirdName,
        firstSurname: user.firstSurname,
        secondSurname: user.secondSurname,
        personCi: user.personCi
    }
    const idPersonNew = await executeQueryInsertPerson('nb_person', person, connection);
    let request = new Request(
        `insert into ${table} (person_id, username, password, status, tx_user, tx_host, tx_date) 
        values (@person_id, @username, @password, @Status, @TxUser, @TxHost, @TxDate);`, err => {
            if (err) {
                console.log(err);
            }
        });
    request.addParameter('person_id', TYPES.BigInt, idPersonNew);
    request.addParameter('username', TYPES.VarChar, user.username);
    request.addParameter('password', TYPES.VarChar, user.password);
    addDataSystemInside(request, TYPES);

    connection.execSql(request);


}

module.exports = {
    addPerson: executeQueryInsertPerson,
    addUser: executeQueryInsertUser
}