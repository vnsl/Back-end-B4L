const yup = require('./configuracoes');

const schemaCadastroRestaurante = yup.object().shape({
        nome: yup.string().required(),
        categoria_id: yup.number().required(),
        taxa_entrega: yup.number().required(),
        tempo_entrega_minutos: yup.number().required(),
        valor_minimo_pedido: yup.number().required()
});



module.exports =  schemaCadastroRestaurante;