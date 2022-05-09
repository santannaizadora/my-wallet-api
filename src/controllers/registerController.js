import db from "../db.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
    const { name, email, password, passwordConfirmation } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword
        }
        await db.collection("users").insertOne(newUser);
        return res.status(201).send("Usuário criado com sucesso");
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Erro ao criar usuário"});
    }
}
export default registerUser;