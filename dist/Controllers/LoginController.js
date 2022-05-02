"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const AuthModel_1 = require("../Routes/AuthModel");
const login = (req, res, next) => {
};
exports.login = login;
const register = (req, res, next) => {
    const newUser = new AuthModel_1.signupModel(req.body);
    newUser
        .save()
        .then((user) => res.status(201).send(user))
        .catch((error) => {
        res.status(400).send(error);
    });
};
exports.register = register;
