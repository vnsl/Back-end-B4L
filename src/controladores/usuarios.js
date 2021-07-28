const knex = require('../conexao');

// rever exercícios do knex

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

    // testar sem esse campo e verificar se armazena null quando o usuário não passar descrição
    // const descricaoValida = descricao ? descricao : "";

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
        const queryConsultaEmail = 'select * from usuario where email = $1';
        const { rowCount: usuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (usuarios > 0) {
            return res.status(400).json("Este email já foi cadastrado.");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // persistência dos dados do usuário no banco de dados
        const queryUsuario = 'insert into usuario (nome, email, senha) values ($1, $2, $3)';
        const { rowCount: novoUsuario} = await conexao.query(queryUsuario, [nome, email, senhaCriptografada]);

        // persistência dos dados do restaurante no banco de dados
        const queryRestaurante = 'insert into restaurante (nome, descricao, categoria_id, taxa_entrega, tempo_entrega_minutos, valor_minimo_pedido) values ($1, $2, $3, $4, $5, $6)';
        const { rowCount: novoRestaurante} = await conexao.query(queryRestaurante, [nomeRestaurante, idCategoria, taxaEntrega, tempoEntregaEmMinutos, valorMinimoPedido]);

        if (novoUsuario === 0) {
            return res.status(400).json('Não foi possível cadastrar o usuario. Tente novamente mais tarde ou entre em contato com o administrador do sistema.');
        }

        if (novoRestaurante === 0) {
            return res.status(400).json('Foram encontradas inconsistências nos dados do restaurante. Tente novamente mais tarde ou entre em contato com o administrador do sistema.');
        }

        return res.status(200).json('Usuário cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario
}