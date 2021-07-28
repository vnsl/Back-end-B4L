const express = require('express');
const login = require('./controladores/login');
const usuarios = require('./controladores/usuarios');

const rotas = express();

// login
rotas.post('/login', login.login);

//usuarios
rotas.post('/usuarios', usuarios.cadastrarUsuario);

module.exports = rotas;