"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackModel = void 0;
const mongoose_1 = require("mongoose");
const feebackSchema = new mongoose_1.Schema({
    feedback: String,
    rating: Number,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.feedbackModel = (0, mongoose_1.model)("feedback", feebackSchema);
