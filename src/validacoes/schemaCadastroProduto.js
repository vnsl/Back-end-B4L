const yup = require('./configuracoes');

const schemaCadastroProduto = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.number().required(),
    permiteObervacoes: yup.boolean()
});


module.exports = schemaCadastroProduto;