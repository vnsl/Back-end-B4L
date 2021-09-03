const knex = require('../conexao');

const listarPedidos = async (req, res) => {
    const { usuario } = req;
    const { restaurante } = usuario;

    try {
        const pedidos = await knex('pedido')
        .where('pedido.restaurante_id', '=', restaurante.id);


        const detalhesPedido = await knex('pedido')
        .where('pedido.restaurante_id', '=', restaurante.id)
        .leftJoin('detalhepedido', 'pedido.id', 'detalhepedido.pedido_id')
        .leftJoin('consumidor', 'pedido.consumidor_id', 'consumidor.id')
        .leftJoin('endereco', 'consumidor.id', 'endereco.consumidor_id')
        .leftJoin('produto', 'produto.id', 'detalhepedido.produto_id');

        const arrayPedidos = await detalhesPedido.map(pedido => {
            return {
              id: pedido.pedido_id,
              produto_id: pedido.produto_id,
              nome_produto: pedido.nome,
              imagem_produto: pedido.imagem,
              qtd_produto: pedido.quantidade_produto,
              endereco: pedido.endereco,
              cep: pedido.cep,
              complemento: pedido.complemento,
              nome_cliente: pedido.nome_consumidor,
              valor_total: pedido.valor_total_produto
            }
        });

        const resposta = {
            pedidos,
            arrayPedidos
        }

        return res.status(200).json(resposta);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const ativarSaiuParaEntrega = async (req, res) => {
    const { usuario } = req;
    const { restaurante } = usuario;
    const { id } = req.params;

    try {
        const pedidoEncontrado = await knex('pedido').where({restaurante_id: restaurante.id, id: id});
        
        if(!pedidoEncontrado[0]){
            return res.status(404).json("Pedido não encontrado");
        }

        const pedidoAtivado = await knex('pedido').update('saiu_entrega', true).where('id', '=', id);

        return res.status(200).json('');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const ativarPedidoFinalizado = async (req, res) => {
    const { usuario } = req;
    const { restaurante } = usuario;
    const { id } = req.params;

    try {
        const pedidoEncontrado = await knex('pedido').where({restaurante_id: restaurante.id, id: id});
        
        if(!pedidoEncontrado[0]){
            return res.status(404).json("Pedido não encontrado");
        }

        const pedidoFinalizado = await knex('pedido').update('pedido_finalizado', true).where('id', '=', id);

        return res.status(200).json('');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    listarPedidos,
    ativarSaiuParaEntrega,
    ativarPedidoFinalizado
}