const express = require('express');
const config = require("../config");
const user = require('./components/user/controller-user');
const auth = require('./components/auth/controller-auth');
const errors = require('../network/erros');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors);

app.listen(config.api.port, () => console.log('Listening on port', config.api.port));