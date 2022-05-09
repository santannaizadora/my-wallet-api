import db from "../db.js";

const validateLogin = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    const user = await db.collection('sessions').findOne({ token });
    if (!user)  return res.status(401).send("Não autorizado");

    req.user = user;
    next();
}
export default validateLogin;
