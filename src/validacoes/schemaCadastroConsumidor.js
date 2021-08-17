const yup = require('./configuracoes');

const schemaCadastroConsumidor = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    telefone: yup.number().integer().required(),
    senha: yup.string().required(),
});


module.exports =  schemaCadastroConsumidor;