const express = require('express');
const response = require("../../../network/response");
const blAuth = require("./index");

const router = express.Router();

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    blAuth.login(username, password)
        .then(value => response.success(req, res, value, 200))
        .catch(reason => response.error(req, res, reason, 400));
});

module.exports = router;