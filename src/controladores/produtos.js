const knex = require('../conexao');
const schemaCadastroProduto = require('../validacoes/schemaCadastroProduto');

const listarProdutos = async (req, res) => {
    const { usuario } = req;

    try {
        const listaDeProdutos = await knex('produto').where('restaurante_id', '=', usuario.id);

        if(!listaDeProdutos[0]){
            return res.status(404).json('Não possui produto cadastrado');
        }

        return res.status(200).json(listaDeProdutos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produto').where({restaurante_id: usuario.id, id: id});
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }

        return res.status(200).json(produtoEncontrado[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const cadastrarProduto = async (req, res) => {
    const { nome, descricao, preco, permiteObervacoes } = req.body;
    const { usuario } = req;

    try {
        await schemaCadastroProduto.validate(req.body);

        const mesmoRestaurante = await knex.select('id').from('restaurante').where('id', '=', usuario.id);

        const restauranteId = Number(mesmoRestaurante[0].id);
      
        const produtoExistente = await knex('produto').where('restaurante_id', '=', restauranteId).andWhere('nome', '=', nome);

        if (produtoExistente[0]) {
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
    const { nome, descricao, preco, permiteObervacoes } = req.body;
    const { usuario } = req;
    const { id } = req.params;

       
    try {

        const produtoEncontrado = await knex('produto').where({restaurante_id: usuario.id, id: id});
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }
    
        const produtoAtualizado = await knex('produto').where({ id }).update({ nome, descricao, preco, permiteObervacoes });

        if (!produtoAtualizado) {
            return res.status(400).json("O produto não foi atualizado");
        }

        return res.status(200).json('O produto atualizado com sucesso.');


    } catch (error) {
        return res.status(400).json(error.message)
    }

};

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produto').where({restaurante_id: usuario.id, id: id});
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }

        const produtoAtivo = await knex('produto').where('id', '=', id).andWhere('ativo', '=', 'true');

        if(produtoAtivo[0]){
            return res.status(404).json("Não é possivel excluir produto ativo");
        }

        const produtoExcluido = await knex('produto').where('id', '=', id).del();
 
        if(!produtoExcluido){
            return res.status(400).json('Não foi possivel excluir o produto');
        }

        return res.status(200).json('Produto excluido com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const ativarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produto').where({restaurante_id: usuario.id, id: id});
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }

        const produtoAtivado = await knex('produto').update('ativo', true).where('id', '=', id);

        if(produtoAtivado === true){
            return res.status(400).json('Produto já está ativado');
        }

        return res.status(200).json();

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const desativarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produto').where({restaurante_id: usuario.id, id: id});
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }

        const produtoDesativado = await knex('produto').update('ativo', false).where('id', '=', id);


        if(produtoDesativado === false){
            return res.status(400).json('produto já está desativado');
        }

        return res.status(200).json('Produto desativado com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }

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