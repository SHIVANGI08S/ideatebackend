var jwt = require('jsonwebtoken')

const JWT_Secret = process.env.JWT_SECRET

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_Secret);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser;
