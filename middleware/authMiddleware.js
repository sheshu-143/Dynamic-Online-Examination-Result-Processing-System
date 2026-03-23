const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token && !req.session.userId) {
        return res.status(401).json({ message: 'No token or session found' });
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else if (req.session.userId) {
        req.userId = req.session.userId;
        next();
    }
};

exports.requireLogin = (req, res, next) => {
    if (!req.session.userId && !req.headers.authorization) {
        return res.status(401).redirect('/login');
    }
    next();
};
