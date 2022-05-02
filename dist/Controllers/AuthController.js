"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.addToBuy = exports.addToCart = exports.favouriteCars = exports.addToFavourite = exports.register = exports.login = void 0;
const AuthModel_1 = require("../Routes/AuthModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SellModel_1 = require("../Routes/SellModel");
const nodemailer_1 = require("nodemailer");
var sendgridTransport = require("nodemailer-sendgrid-transport");
const saltRounds = 10;
const transporter = (0, nodemailer_1.createTransport)(sendgridTransport({
    auth: {
        api_key: process.env.MONGO_URL || process.env.mongoUri,
    },
}));
const login = (req, res, next) => {
    const user = new AuthModel_1.signupModel(req.body);
    AuthModel_1.signupModel.findOne({ email: user.email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!foundUser) {
            res.status(404).send("Email not found");
        }
        else {
            bcrypt_1.default.compare(user.password, foundUser.password, (error, result) => {
                if (result) {
                    res.send(foundUser);
                }
                else {
                    res.status(400).send("Password mismatch");
                }
            });
        }
    });
};
exports.login = login;
const register = (req, res, next) => {
    const newUser = new AuthModel_1.signupModel(req.body);
    bcrypt_1.default.hash(newUser.password, saltRounds, (err, hash) => {
        newUser.password = hash;
        newUser
            .save()
            .then((user) => res.status(201).send(user))
            .catch((error) => {
            res.status(400).send(error);
        });
    });
};
exports.register = register;
const addToFavourite = (req, res, next) => {
    const { id, email } = req.body;
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (foundUser) {
            let tempArr = foundUser.favourites;
            if (tempArr.includes(id)) {
                tempArr = tempArr.filter((item) => item !== id);
            }
            else {
                tempArr.push(id);
            }
            AuthModel_1.signupModel.findOneAndUpdate({ email }, { favourites: tempArr }, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                else if (result) {
                    res.send(result);
                }
                else {
                    res.send([]);
                }
            });
        }
    });
};
exports.addToFavourite = addToFavourite;
const favouriteCars = (req, res, next) => {
    const { email } = req.params;
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (foundUser) {
            res.send(foundUser.favourites);
        }
        else {
            res.send([]);
        }
    });
};
exports.favouriteCars = favouriteCars;
const addToCart = (req, res, next) => {
    const { id, email } = req.body;
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (foundUser) {
            let tempArr = foundUser.cart;
            if (tempArr.includes(id)) {
                tempArr = tempArr.filter((item) => item !== id);
            }
            else {
                tempArr.push(id);
            }
            AuthModel_1.signupModel.findOneAndUpdate({ email }, { cart: tempArr }, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                else if (result) {
                    res.send(result);
                }
                else {
                    res.send([]);
                }
            });
        }
    });
};
exports.addToCart = addToCart;
const addToBuy = (req, res) => {
    const { id, email } = req.body;
    SellModel_1.sellModel.findByIdAndUpdate(id, { sellStatus: true }, (err, result) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            AuthModel_1.signupModel.findById(result.sellerId, (err, foundUser) => {
                if (err) {
                    res.status(500).send(err);
                }
                else if (foundUser) {
                    let tempArr = foundUser.sell;
                    if (tempArr.includes(id)) {
                        tempArr = tempArr.filter((item) => item !== id);
                    }
                    else {
                        tempArr.push(id);
                    }
                    transporter.sendMail({
                        to: foundUser.email,
                        from: "sduqiygh@hi2.in",
                        subject: "Car Sold",
                        html: `<h1>Car Sold</h1>`,
                    });
                    AuthModel_1.signupModel.findByIdAndUpdate(result.sellerId, { sell: tempArr }, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                    });
                }
            });
        }
    });
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (foundUser) {
            let tempArr = foundUser.buy;
            let tempArr1 = foundUser.cart;
            if (tempArr1.includes(id)) {
                tempArr1 = tempArr1.filter((item) => item !== id);
            }
            if (tempArr.includes(id)) {
                tempArr = tempArr.filter((item) => item !== id);
            }
            else {
                tempArr.push(id);
            }
            transporter.sendMail({
                to: email,
                from: "sduqiygh@hi2.in",
                subject: "Car Bought",
                html: `<h1>Car Bought</h1>`,
            });
            AuthModel_1.signupModel.findOneAndUpdate({ email }, { buy: tempArr, cart: tempArr1 }, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                else if (result) {
                    res.send(result);
                }
                else {
                    res.send([]);
                }
            });
        }
    });
};
exports.addToBuy = addToBuy;
const getCart = (req, res, next) => {
    const { email } = req.params;
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (foundUser) {
            res.send(foundUser.cart);
        }
        else {
            res.send([]);
        }
    });
};
exports.getCart = getCart;
