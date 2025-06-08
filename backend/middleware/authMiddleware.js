const jwt = require("jsonwebtoken");
const secret_key = process.env.secret_key;

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ error: "No token provided!"});

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token format invalid' });

    try{
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
        }
    catch(err) {
        return res.status(403).json({ error: "Invalid Token"});
    }
}

module.exports = authMiddleware;