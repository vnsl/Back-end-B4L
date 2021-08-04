const yup = require('./configuracoes');

const schemaCadastroRestaurante = yup.object().shape({
        nome: yup.string().required(),
        idCategoria: yup.number().required(),
        taxaEntrega: yup.number().required(),
        tempoEntregaEmMinutos: yup.number().required(),
        valorMinimoPedido: yup.number().required()
});



module.exports =  schemaCadastroRestaurante;