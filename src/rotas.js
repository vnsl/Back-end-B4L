const express = require('express');
const login = require('./controladores/login');
const consumidores = require('./controladores/consumidores');
const imagem = require('./controladores/imagem');
const pedidos = require('./controladores/pedidos');
const autenticacao = require('./filtros/autenticacao');

const rotas = express();

// login
rotas.post('/login', login.login);

//consumidores
rotas.post('/consumidores', consumidores.cadastrarConsumidor);

// verificação de autenticação
rotas.use(autenticacao);

// envio da imagem
rotas.post('/upload', imagem.enviarImagem);

// edição consumidor
rotas.put('/consumidores/:id', consumidores.atualizarConsumidor);

//Crud de produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);
rotas.post('/produtos/:id/ativar', produtos.ativarProduto);
rotas.post('/produtos/:id/desativar', produtos.desativarProduto);

// Listar Pedidos
rotas.get('/pedidos', pedidos.listarPedidos);

// Saiu para entrega
rotas.put('/pedidos/:id', pedidos.ativarSaiuParaEntrega);

// Pedido Finalizado
rotas.post('/pedidos/:id', pedidos.ativarPedidoFinalizado);
rotas.post('/produtos/:id/desativar', produtos.desativarProduto); 

module.exports = rotas;