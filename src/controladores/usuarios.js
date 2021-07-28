const knex = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha} = req.body;

    const {nome: nomeRestaurante, descricao, idCategoria, taxaEntrega, tempoEntregaEmMinutos, valorMinimoPedido} = req.body.restaurante;

    // validacao dados do usuario

    if (!nome) {
        return res.status(404).json("Favor informar o nome do usuário.");
    }

    if (!email) {
        return res.status(404).json("Favor informar o email do usuário.");
    }
    
    if (!senha) {
        return res.status(404).json("Favor informar a senha.");
    }

    // validacao dados do restaurante

    if(!nomeRestaurante) {
        return res.status(404).json("Favor informar o nome do restaurante.");
    }

    if(!idCategoria) {
        return res.status(404).json("Favor informar o id relativo à Categoria do restaurante.");
    }

    if(!taxaEntrega) {
        return res.status(404).json("Favor informar a taxa de entrega do restaurante.");
    }

    if(!tempoEntregaEmMinutos) {
        return res.status(404).json("Favor informar o tempo de entrega do restaurante em minutos.");
    }

    if(!valorMinimoPedido) {
        return res.status(404).json("Favor informar o valor mínimo do pedido.");
    }

    try {
        const quantidadeUsuarios = await knex('usuario').where({ email }).first();

        if (quantidadeUsuarios) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const categoria = await knex('categoria').where('id', idCategoria).first();

        if (!categoria) {
            return res.status(404).json("A categoria informada não existe.");
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

module.exports = {
    cadastrarUsuario
}