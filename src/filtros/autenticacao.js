const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const autenticacao = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization.replace('Bearer', '').trim();

    if (!token) {
        return res.status(404).json('Token não foi informado');
    }
    
    try {
        
        const { id } = jwt.verify(token, senhaHash);

        const consumidor = await knex('consumidor').where({ id }).first();

        if (!consumidor) {
            return res.status(404).json("Token inválido");
        }
        
        const { senha, ...dadosConsumidor } = consumidor;

        req.consumidor = { 
            dadosConsumidor
        }
    
        next();

        } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = autenticacao;