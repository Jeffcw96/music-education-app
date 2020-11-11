const config = require('config');
const jwt = require('jsonwebtoken');

module.exports - function (req, res, next) {

    const tokenString = req.header("Authorization");
    console.log("token string", tokenString);
    const splitTokenString = tokenString.split('Bearer ');
    const token = splitTokenString[1];
    console.log("token", token);

    if (!tokenString) {
        return res.status(401).json({ error: "Authorization Denied" });
    }


    try {
        const decoded = jwt.verify(token, config.get('token'));
        req.user = decoded.user;
        next()
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ error: "Invalid Token" })
    }

}