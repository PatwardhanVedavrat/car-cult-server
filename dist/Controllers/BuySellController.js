"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = exports.getSiteData = exports.updateCarData = exports.getSellList = exports.getBuyList = exports.getCartCars = exports.getFavouriteCars = exports.buyOldCar = exports.buyNewCar = exports.sellCar = void 0;
const AuthModel_1 = require("../Routes/AuthModel");
const FeedbackModel_1 = require("../Routes/FeedbackModel");
const SellModel_1 = require("../Routes/SellModel");
const resturnRes = (err, result, res) => {
    if (err) {
        res.status(500).send(err);
    }
    else if (result) {
        res.status(201).send(result);
    }
    else {
        res.send([]);
    }
};
const sellCar = (req, res, next) => {
    const newCarToSell = new SellModel_1.sellModel(req.body);
    newCarToSell
        .save()
        .then((carToSell) => res.status(201).send(carToSell))
        .catch((err) => {
        res.status(400).send(err);
    });
};
exports.sellCar = sellCar;
const buyNewCar = (req, res, next) => {
    SellModel_1.sellModel.find({ year: new Date().getFullYear(), sellStatus: false }, (err, result) => {
        resturnRes(err, result, res);
    });
};
exports.buyNewCar = buyNewCar;
const buyOldCar = (req, res, next) => {
    SellModel_1.sellModel.find({ year: { $ne: new Date().getFullYear() }, sellStatus: false }, (err, result) => {
        resturnRes(err, result, res);
    });
};
exports.buyOldCar = buyOldCar;
const getFavouriteCars = (req, res, next) => {
    const { email } = req.params;
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!foundUser) {
            res.status(404).send("Email not found");
        }
        else {
            SellModel_1.sellModel.find({ _id: { $in: foundUser.favourites } }, (error, result) => {
                resturnRes(error, result, res);
            });
        }
    });
};
exports.getFavouriteCars = getFavouriteCars;
const getCartCars = (req, res, next) => {
    const { email } = req.params;
    AuthModel_1.signupModel.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!foundUser) {
            res.status(404).send("Email not found");
        }
        else {
            SellModel_1.sellModel.find({ _id: { $in: foundUser.cart } }, (error, result) => {
                resturnRes(error, result, res);
            });
        }
    });
};
exports.getCartCars = getCartCars;
const getBuyList = (req, res, next) => {
    const { _id } = req.params;
    AuthModel_1.signupModel.findById(_id, (err, foundUser) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!foundUser) {
            res.status(404).send("Invalid ID");
        }
        else {
            SellModel_1.sellModel.find({ _id: { $in: foundUser.buy } }, (error, result) => {
                resturnRes(error, result, res);
            });
        }
    });
};
exports.getBuyList = getBuyList;
const getSellList = (req, res, next) => {
    const { _id } = req.params;
    SellModel_1.sellModel.find({ sellerId: _id }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (result) {
            res.status(200).send(result);
        }
    });
};
exports.getSellList = getSellList;
const updateCarData = (req, res, next) => {
    const { _id } = req.params;
    SellModel_1.sellModel.findByIdAndUpdate(_id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (result) {
            res.status(200).send(result);
        }
    });
};
exports.updateCarData = updateCarData;
const getSiteData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const totalSells = yield SellModel_1.sellModel.find({ sellStatus: true }).count();
    const totalRegisteredCars = yield SellModel_1.sellModel.find().count();
    const totalRegisteredUsers = yield AuthModel_1.signupModel.find().count();
    res
        .status(200)
        .send({ totalSells, totalRegisteredCars, totalRegisteredUsers });
});
exports.getSiteData = getSiteData;
const feedback = (req, res, next) => {
    const newFeedback = new FeedbackModel_1.feedbackModel(req.body);
    newFeedback
        .save()
        .then((feedback) => {
        res.status(201).send(feedback);
    })
        .catch((err) => {
        res.status(400).send(err);
    });
};
exports.feedback = feedback;
