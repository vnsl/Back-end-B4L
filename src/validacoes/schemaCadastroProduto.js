const yup = require('./configuracoes');

const schemaCadastroProduto = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.number().strict().required(),
    permiteObervacoes: yup.boolean()
});


module.exports = schemaCadastroProduto;