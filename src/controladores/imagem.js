const supabase = require('../supabase');

const enviarImagem = async(req, res) => {
    const { id, nome, pasta, imagem } = req.body;

    const buffer = Buffer.from(imagem, 'base64');

    const nomeId = id + nome;

    try {
        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(`${pasta}/${nomeId}`, buffer);

        if(error){
            return res.status(400).json(error.message);
        }

        const { publicURL, error: errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(nome)

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