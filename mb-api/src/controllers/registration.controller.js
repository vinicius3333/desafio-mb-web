import createUser from "../usecase/create-user.js";
import getPage from "../usecase/get-page.js";

function get(req, res) {
    try {
        const pagePath = getPage.execute()
        res.sendFile(pagePath);
    } catch (err) {
        console.error("Err:", err.message);
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
}

async function create(req, res) {
    try {
        const body = req.body
        const user = await createUser.execute(body)
        console.log("Usuário criado com sucesso!")
        return res.status(201).json(user);
    } catch (err) {
        console.error("Err:", err.message);
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
}

export {
    get,
    create
};