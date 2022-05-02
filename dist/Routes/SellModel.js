"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellModel = void 0;
const mongoose_1 = require("mongoose");
const AuthModel_1 = require("./AuthModel");
const sellCarSchema = new mongoose_1.Schema({
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: AuthModel_1.signupModel },
    sellStatus: { type: Boolean, required: true },
    address: String,
    brand: { type: String, required: true },
    description: String,
    fuel: String,
    imageUrl: String,
    mobileNo: Number,
    model: String,
    price: Number,
    run: Number,
    sellerName: String,
    type: String,
    year: Number,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.sellModel = (0, mongoose_1.model)("Sell", sellCarSchema, "Sell");
