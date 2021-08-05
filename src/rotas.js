const express = require('express');
const login = require('./controladores/login');
const usuarios = require('./controladores/usuarios');
const produtos = require('./controladores/produtos');
const categorias = require('./controladores/categorias');
const autenticacao = require('./filtros/autenticacao');

const rotas = express();

// login
rotas.post('/login', login.login);

//usuarios
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//lista de categorias
rotas.get('/categorias', categorias.listarCategorias);

// verificação de autenticação
rotas.use(autenticacao);

// edição usuario e restaurante
rotas.put('/usuarios/:id', usuarios.atualizarUsuario);

//Crud de produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);
rotas.post('/produtos/:id/ativar', produtos.ativarProduto);
rotas.post('/produtos/:id/desativar', produtos.desativarProduto);




module.exports = rotas;