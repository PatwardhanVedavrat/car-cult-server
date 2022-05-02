"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupModel = void 0;
const mongoose_1 = require("mongoose");
const signupSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    favourites: [String],
    cart: [String],
    buy: [String],
    sell: [String],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.signupModel = (0, mongoose_1.model)("Signup", signupSchema, "Login");
