const knex = require('../conexao');

const listarPedidos = async (req, res) => {
    const { usuario } = req;
    const { restaurante } = usuario;

    try {
        const listaDePedidos = await knex('pedido').where('restaurante_id', '=', restaurante.id);

        return res.status(200).json(listaDePedidos);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarPedidos
}