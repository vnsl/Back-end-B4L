const knex = require('../conexao');
const bcrypt = require('bcrypt');
const schemaCadastroUsuario = require('../validacoes/schemaCadastroUsuario');
const schemaCadastroRestaurante = require('../validacoes/schemaCadastroRestaurante');
const schemaAtualizarUsuario = require('../validacoes/schemaAtualizarUsuario');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha} = req.body;

    const { nome: nomeRestaurante, descricao, idCategoria, taxaEntrega, tempoEntregaEmMinutos, valorMinimoPedido } = req.body.restaurante;

    try {
        await schemaCadastroUsuario.validate(req.body);
        await schemaCadastroRestaurante.validate(req.body.restaurante);

        const quantidadeUsuarios = await knex('usuario').where({ email }).first();

        if (quantidadeUsuarios) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const categoria = await knex('categoria').where('id', idCategoria).first();

        if (!categoria) {
            return res.status(404).json("a categoria informada não existe.");
        }

        // persistência dos dados do usuário no banco de dados

        const usuario = await knex('usuario').insert({nome, email, 'senha' : senhaCriptografada}).returning('*');

        // persistência dos dados do restaurante no banco de dados

        const restaurante = await knex('restaurante').insert({'usuario_id': usuario[0].id, 'nome': nomeRestaurante, descricao, 'categoria_id': idCategoria, 'taxa_entrega': taxaEntrega, 'tempo_entrega_minutos': tempoEntregaEmMinutos, 'valor_minimo_pedido': valorMinimoPedido}).returning('*');

        if (usuario.length === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        if (restaurante.length === 0) {
            return res.status(400).json("O restaurante não foi cadastrado.");
        }

        return res.status(200).json('Usuário cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha} = req.body;
    const { nome: nomeRestaurante, descricao, idCategoria, taxaEntrega, tempoEntregaEmMinutos, valorMinimoPedido } = req.body.restaurante;
    const { usuario } = req;
    const { restaurante } = usuario;
    const { id } = req.params;

    try {
        await schemaAtualizarUsuario.validate(req.body);
        await schemaCadastroRestaurante.validate(req.body.restaurante);

        const usuarioEncontrado = await knex('usuario').where({'id': id}).andWhere('id', '=', restaurante.id);
        
        if(!usuarioEncontrado[0]){
            return res.status(404).json("Usuário não encontrado");
        }

        const categoria = await knex('categoria').where('id', idCategoria).first();

        if (!categoria) {
            return res.status(404).json("a categoria informada não existe.");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioAtualizado = await knex('usuario').where({ id }).update({ nome, email, 'senha': senhaCriptografada  });

        const restauranteAtualizado = await knex('restaurante').where({ id }).update({ 
            'nome': nomeRestaurante, 
            descricao, 
            'categoria_id': idCategoria, 
            'taxa_entrega': taxaEntrega, 
            'tempo_entrega_minutos': tempoEntregaEmMinutos, 
            'valor_minimo_pedido': valorMinimoPedido 
        });

        if (!usuarioAtualizado) {
            return res.status(400).json("O usuário não foi atualizado");
        }

        if (!restauranteAtualizado) {
            return res.status(400).json("O restaurante não foi atualizado");
        }

        return res.status(200).json('');
        
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    cadastrarUsuario,
    atualizarUsuario
}