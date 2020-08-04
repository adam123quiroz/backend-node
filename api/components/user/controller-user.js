const express = require('express');
const response = require("../../../network/response");
const blUser = require("./index");

const router = express.Router();

router.get('/', (req, res) => {
    blUser.list()
        .then(value => response.success(req, res, value, 200))
        .catch(reason => response.error(req, res, reason, 500));
});

router.get('/:id', (req, res) => {
    let idUser = req.params.id;
    blUser.getById(idUser)
        .then(value => response.success(req, res, value, 200))
        .catch(reason => response.error(req, res, reason, 500));
});

router.post('/', (req, res) => {
   let user = req.body;
   blUser.upsert(user)
       .then(value => response.success(req, res, value, 200))
       .catch(reason => response.error(req, res, reason, 200));

});

router.delete('/:id', (req, res) => {
   let idUser = req.params.id;

});

module.exports = router;