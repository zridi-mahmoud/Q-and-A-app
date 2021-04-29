var mongoose = require('mongoose');
jwt = require('jsonwebtoken');
bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const key = require('../config/jwt.config.js');

exports.register = function(req, res) {
    const newUser = new User(req.body.user);
    newUser.password = bcrypt.hashSync(req.body.user.password, 10);
    newUser.save()
        .then(data => {
            data.password = undefined;
            return (
                res.json({
                    token: jwt.sign({ email: data.email, firstName: data.firstName, _id: data._id }, key.TOKEN_SECRET),
                    data
                })
            )
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

exports.sign_in = function(req, res) {
    const newUser = new User(req.body.user);
    User.findOne({ 'email': req.body.user.email })
        .then(data => {
            if (!data) {
                return res.send('Icorrect email');
            }
            if (bcrypt.compareSync(newUser.password, data.password)) {
                return (
                    res.json({
                        token: jwt.sign({ email: data.email, firstName: data.firstName, _id: data._id }, key.TOKEN_SECRET),
                        data
                    })
                )
            }
            return res.send('Authentication failed. Invalid password.');
        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving user"
            });
        });
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {

        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};
exports.profile = function(req, res, next) {
    if (req.user) {
        res.send(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};