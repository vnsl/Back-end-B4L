const knex = require('../conexao');
const bcrypt = require('bcrypt');
const schemaCadastroUsuario = require('../validacoes/schemaCadastroUsuario');
const schemaCadastroRestaurante = require('../validacoes/schemaCadastroRestaurante');
const schemaAtualizarUsuario = require('../validacoes/schemaAtualizarUsuario');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha} = req.body;

    const { nome: nome_restaurante, descricao, categoria_id, taxa_entrega, tempo_entrega_minutos, valor_minimo_pedido } = req.body.restaurante;

    try {
        await schemaCadastroUsuario.validate(req.body);
        await schemaCadastroRestaurante.validate(req.body.restaurante);

        const quantidadeUsuarios = await knex('usuario').where({ email }).first();

        if (quantidadeUsuarios) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const categoria = await knex('categoria').where('id', categoria_id).first();

        if (!categoria) {
            return res.status(404).json("a categoria informada não existe.");
        }

        // persistência dos dados do usuário no banco de dados

        const usuario = await knex('usuario').insert({nome, email, 'senha' : senhaCriptografada}).returning('*');

        // persistência dos dados do restaurante no banco de dados

        const restaurante = await knex('restaurante').insert({'usuario_id': usuario[0].id, 'nome': nome_restaurante, descricao, 'categoria_id': categoria_id, 'taxa_entrega': taxa_entrega, 'tempo_entrega_minutos': tempo_entrega_minutos, 'valor_minimo_pedido': valor_minimo_pedido}).returning('*');

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
    const { nome, email, senha, nova_senha } = req.body;
    const { nome: nome_restaurante, descricao, imagem, categoria_id, taxa_entrega, tempo_entrega_minutos, valor_minimo_pedido } = req.body.restaurante;
    const { usuario } = req;
    const { restaurante } = usuario;
    const { id } = req.params;

    console.log(req.body);

    try {
        await schemaAtualizarUsuario.validate(req.body);
        await schemaCadastroRestaurante.validate(req.body.restaurante);

        const usuarioEncontrado = await knex('usuario').where({'id': id}).andWhere('id', '=', restaurante.id);
        
        if(!usuarioEncontrado[0]){
            return res.status(404).json("Usuário não encontrado");
        }

               const categoria = await knex('categoria').where('id', categoria_id).first();

        if (!categoria) {
            return res.status(404).json("a categoria informada não existe.");
        }


        if(nova_senha){
         
            const senhaValidada = await bcrypt.compare(senha, usuarioEncontrado[0].senha);

            if(!senhaValidada){
            return res.status(404).json("A senha atual informada está incorreta");
            }

            const senhaCriptografada = await bcrypt.hash(nova_senha, 10);

            const senhaAtualizada = await knex('usuario').where({ id }).update({ 'senha': senhaCriptografada });          
        }
        

        const usuarioAtualizado = await knex('usuario').where({ id }).update({ nome, email });

        const restauranteAtualizado = await knex('restaurante').where({ id }).update({ 
            'nome': nome_restaurante, 
            descricao,
            imagem,
            'categoria_id': categoria_id, 
            'taxa_entrega': taxa_entrega, 
            'tempo_entrega_minutos': tempo_entrega_minutos,
            'valor_minimo_pedido': valor_minimo_pedido 
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