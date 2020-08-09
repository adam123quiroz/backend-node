function addDataSystemInside(request, TYPES) {
    request.addParameter('Status', TYPES.Int, 1);
    request.addParameter('TxUser', TYPES.VarChar, 'Admin');
    request.addParameter('TxHost', TYPES.VarChar, 'localhost');
    request.addParameter('TxDate', TYPES.DateTime, new Date());
}

module.exports = addDataSystemInside;