const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token - i think that decoded is actually the payload we sent when we loggeג in so we can pull out the user
    //obcejt from it and now the req.user will contain the user id
    try {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                //  console.log(decoded.user.id + " decoded user id!!!")
                req.user = decoded.user;
                //  console.log(req.user.id + " is the req.user id")
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
};
