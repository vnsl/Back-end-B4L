const express = require('express');
const login = require('./controladores/login');

const rotas = express();

// login
rotas.post('/login', login.login);


module.exports = rotas;