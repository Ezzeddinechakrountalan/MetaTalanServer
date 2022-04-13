const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const Auth = (req, res, next) => {
    //get token from header
    const { authorization } = req.headers;
    //chekck token
    if (!authorization) {
        return res.status(401).json({
            msg: 'No token, auth denied '
        })
    }
    try {
        jwt.verify(authorization, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    msg: 'No token, auth denied '
                })
            }
            const { _id } = payload
            User.findById(_id).then(userdata => {
                req.user = userdata
                next()
            })
        })
    } catch (error) {
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }
}

const isAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    var decAdmin = jwt.decode(authorization, { complete: true });

    jwt.verify(authorization, process.env.JWT_SECRET, function (err, decoded) {
        if (decAdmin.payload.role !== "Manager") {
            res.status(403).json({
                msg: 'not authorized to perform this operation'
            })
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        }
    });


}

module.exports = {
    Auth,
    isAdmin
}