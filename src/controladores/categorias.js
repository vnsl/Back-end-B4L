const knex = require('../conexao');

const listarCategorias = async (req, res) => {
    
    try {
        const listaDeCategorias = await knex('categoria');

        return res.status(200).json(listaDeCategorias);

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = { listarCategorias };