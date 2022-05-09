import db from "../db.js";
import bcrypt from "bcrypt";

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Senha inválida" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Erro ao autenticar usuário" });
    }
}
export default validateLogin;