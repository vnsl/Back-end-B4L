const supabase = require('../supabase');

const enviarImagem = async(req, res) => {
    const { imagem } = req.body;

    const randomName = Date.now();

    const imagemConvertida = imagem.replace("data:image/jpeg;base64,", "");

    const buffer = Buffer.from(imagemConvertida, 'base64');

    try {
        const { data, error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(`${randomName}`, buffer);

        if(error){
            return res.status(400).json(error.message);
        }

        const { publicURL, error: errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(randomName);

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