const User = require('../models/users.model');

module.exports = {
    getUser: (req, res) => {
        res.json({
            user: req.user
        })
    },

    register: (req, res, next) => {
        User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                success: 'Sikeres regisztráció'
            })
        });
    },

    login: (req, res) => {
        res.json({
            success: 'Sikeres login',
            username: req.user.username,
            id: req.user._id
        })
    },

    logout: (req, res) => {
        req.logout();
        res.json({
            success: 'Kilépve'
        })
    }
}