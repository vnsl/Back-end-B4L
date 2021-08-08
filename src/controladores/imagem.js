const supabase = require('../supabase');

const enviarImagem = async(req, res) => {
    const { nome, imagem } = req.body;

    const imagemConvertida = imagem.replace("data:image/jpeg;base64,", "");
    // const nomeImagem = nome.replace(" ", "");

    const buffer = Buffer.from(imagemConvertida, 'base64');

    // const nomeId = id + nomeImagem;

    // const nomeUrl = pasta + '/' + nomeId;

    try {
        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(`${nome}`, buffer);

        if(error){
            return res.status(400).json(error.message);
        }

        const { publicURL, error: errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(nome);

            if(errorPublicUrl){
                return res.status(400).json(errorPublicUrl.message);
            }


        return res.status(200).json(publicURL);    
        
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    enviarImagem
}