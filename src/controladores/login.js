const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const senhaHash = require('../senhaHash');
const schemaLogin = require('../validacoes/schemaLogin')


const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);

        const consumidor = await knex('consumidor').where({ email }).first();
        
        if (!consumidor) {
            return res.status(404).json("Consumidor não encontrado");
        }

        const senhaValidada = await bcrypt.compare(senha, consumidor.senha);

        if(!senhaValidada) {
            return res.status(400).json("O endereço de email ou a senha que você inseriu não são válidos")
        }

        const token = jwt.sign({ id: consumidor.id, email: consumidor.email}, senhaHash, {expiresIn: '24h'});

        const {senha: _, ...dadosConsumidor } = consumidor;

        return res.status(200).json({
            consumidor: {
                id: dadosConsumidor.id,
                nome: dadosConsumidor.nome,
                email: dadosConsumidor.email,
                telefone: dadosConsumidor.telefone
            }, 
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    login
}