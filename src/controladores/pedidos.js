const knex = require('../conexao');

const listarPedidos = async (req, res) => {
    const { usuario } = req;
    const { restaurante } = usuario;

    try {
        const detalhesPedido = await knex('pedido').leftJoin('detalhepedido', 'pedido.id', 'detalhepedido.pedido_id')
        .leftJoin('consumidor', 'pedido.consumidor_id', 'consumidor.id').leftJoin('endereco', 'consumidor.id', 'endereco.consumidor_id')
        .where('pedido.restaurante_id', '=', restaurante.id);    


        return res.status(200).json(detalhesPedido);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarPedidos
}