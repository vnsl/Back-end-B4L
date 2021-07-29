const knex = require('../conexao');
const schemaCadastroProduto = require('../validacoes/schemaCadastroProduto');

const listarProdutos = async (req, res) => {
    const { usuario } = req;

    try {
        const listaDeProdutos = await knex('produto').where('restaurante_id', '=', usuario.id);

        return res.status(200).json(listaDeProdutos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterProduto = async (req, res) => {

};

const cadastrarProduto = async (req, res) => {
    const { nome, descricao, preco, permiteObervacoes } = req.body;
    const { usuario } = req;

    try {
        await schemaCadastroProduto.validate(req.body);

        const mesmoRestaurante = await knex.select('id').from('restaurante').where('id', '=', usuario.id);

        const restauranteId = Number(mesmoRestaurante[0].id);
      
        const produtoExistente = await knex('produto').where({ nome }).first();

        if (produtoExistente) {
            return res.status(400).json("O produto já cadastrado");
        }

        const produto = await knex('produto').insert({
            'nome': nome, descricao, 'preco': preco, 'permite_observacoes': permiteObervacoes, 'restaurante_id': restauranteId }).returning('*');
        
        return res.status(200).json('Produto cadastrado com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const atualizarProduto = async (req, res) => {

};

const excluirProduto = async (req, res) => {

};

const ativarProduto = async (req, res) => {

};

const desativarProduto = async (req, res) => {

};


module.exports = {
    cadastrarProduto,
    listarProdutos,
    atualizarProduto,
    obterProduto,
    excluirProduto,
    ativarProduto,
    desativarProduto
};