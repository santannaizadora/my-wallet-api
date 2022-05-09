import db from "../db.js";
import Joi from "joi";

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

const validateRegister = async (req, res, next) => {
    const { name, email, password, passwordConfirmation } = req.body;
    const { error } = emailSchema.validate({ email });
    try {
        const user = await db.collection("users").findOne({ email });
        if (!name || !email || !password || !passwordConfirmation) {
            return res.status(400).send({message: "Preencha todos os campos"});
        }
        if (user) {
            return res.status(409).send({message: "E-mail já em uso"});
        }
        if (error) {
            return res.status(400).send({message: "E-mail inválido"});
        }
        if (password !== passwordConfirmation) {
            return res.status(409).send({message: "As senhas não conferem"});
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Erro ao criar usuário"});
    }
}
export default validateRegister;