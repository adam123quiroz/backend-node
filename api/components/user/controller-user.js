const express = require('express');
const response = require("../../../network/response");
const blUser = require("./index");
const secure = require('./secure');

const router = express.Router();

router.get('/', (req, res, next) => {
    blUser.list()
        .then(value => response.success(req, res, value, 200))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    let idUser = req.params.id;
    blUser.getById(idUser)
        .then(value => response.success(req, res, value, 200))
        .catch(next);
});

router.post('/', (req, res, next) => {
   let user = req.body;
   blUser.upsert(user)
       .then(value => response.success(req, res, value, 200))
       .catch(next);

});

router.put('/', secure('update'), (req, res, next) => {
    let user = req.body;
    blUser.upsert(user)
        .then(value => response.success(req, res, value, 200))
        .catch(next);
});


module.exports = router;