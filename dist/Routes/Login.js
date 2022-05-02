"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const loginSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const loginModel = (0, mongoose_1.model)("Login", loginSchema);
exports.default = loginModel;
