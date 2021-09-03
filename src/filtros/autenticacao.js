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

        const usuario = await knex('usuario').where({ id }).first();

        if (!usuario) {
            return res.status(404).json("Token restaurante inválido");
        }

        const restaurante = await knex('restaurante').where('usuario_id', '=', `${id}`).first();
        
        const { senha, ...dadosUsuario } = usuario;

        req.usuario = { 
            dadosUsuario,
            restaurante
        }
    
        next();

        } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = autenticacao;