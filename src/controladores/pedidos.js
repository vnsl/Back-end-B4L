const knex = require('../conexao');

const listarPedidos = async (req, res) => {
    const { usuario } = req;
    const { restaurante } = usuario;

    try {
        const detalhesPedido = await knex('pedido')
        .where('pedido.restaurante_id', '=', restaurante.id)
        .leftJoin('detalhepedido', 'pedido.id', 'detalhepedido.pedido_id')
        .leftJoin('consumidor', 'pedido.consumidor_id', 'consumidor.id')
        .leftJoin('endereco', 'consumidor.id', 'endereco.consumidor_id')
        .leftJoin('produto', 'produto.id', 'detalhepedido.produto_id');

        const arrayPedidos = await detalhesPedido.map(pedido => {
            const pedidoIndividual = {
              id: pedido.pedido_id,
              nome_produto: pedido.nome,
              imagem_produto: pedido.imagem,
              qtd_produto: pedido.quantidade_produto,
              endereco: pedido.endereco,
              cep: pedido.cep,
              complemento: pedido.complemento,
              nome_cliente: pedido.nome_consumidor,
              valor_total: pedido.valor_total_produto
            //   somar valor total com a taxa de entrega no front
            }
            return pedidoIndividual;
        });

        return res.status(200).json(arrayPedidos);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarPedidos
}