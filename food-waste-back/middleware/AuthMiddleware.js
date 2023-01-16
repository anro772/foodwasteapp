const { verify } = require("jsonwebtoken");


const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "Access Denied" });

    try {
        const validToken = verify(accessToken, "wowwow");
        req.user = validToken;

        if (validToken) {

            next();
        }
    } catch (err) {
        res.json({ error: "Invalid Token" });
    }
};

module.exports = { validateToken };