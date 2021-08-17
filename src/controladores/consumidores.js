const knex = require('../conexao');
const bcrypt = require('bcrypt');
const schemaCadastroConsumidor = require('../validacoes/schemaCadastroConsumidor');
const schemaAtualizarConsumidor = require('../validacoes/schemaAtualizarConsumidor');

const cadastrarConsumidor = async (req, res) => {
    const { nome, email, telefone, senha} = req.body;

    try {
        await schemaCadastroConsumidor.validate(req.body);

        const quantidadeConsumidores = await knex('consumidor').where({ email }).first();

        if (quantidadeConsumidores) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // persistência dos dados do consumidor no banco de dados

        const consumidor = await knex('consumidor').insert({nome, email, telefone, 'senha' : senhaCriptografada}).returning('*');


        if (consumidor.length === 0) {
            return res.status(400).json("O consumidor não foi cadastrado.");
        }

        return res.status(200).json('Consumidor cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarConsumidor = async (req, res) => {
    const { nome, email, telefone, senha, nova_senha } = req.body;
    const { consumidor } = req;
    const { id } = req.params;

    try {

        const consumidorEncontrado = await knex('consumidor').where({'id': id});
        
        if(!consumidorEncontrado[0]){
            return res.status(404).json("Consumidor não encontrado");
        }

        const senhaValidada = await bcrypt.compare(senha, consumidorEncontrado[0].senha);

        if(!senhaValidada){
        return res.status(404).json("A senha atual informada está incorreta");
        }

        await schemaAtualizarConsumidor.validate(req.body);

        if(nova_senha){

            const senhaCriptografada = await bcrypt.hash(nova_senha, 10);

            const senhaAtualizada = await knex('consumidor').where({ id }).update({ 'senha': senhaCriptografada });          
        }        

        const consumidorAtualizado = await knex('consumidor').where({ id }).update({ nome, email, telefone });


        if (!consumidorAtualizado) {
            return res.status(400).json("O consumidor não foi atualizado");
        }

        return res.status(200).json('');
        
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    cadastrarConsumidor,
    atualizarConsumidor
}