const yup = require('./configuracoes');

const schemaCadastroProduto = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.number().required(),
    permite_obervacoes: yup.boolean()
});


module.exports = schemaCadastroProduto;