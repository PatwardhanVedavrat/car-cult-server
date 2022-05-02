"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../Controllers/AuthController");
const router = new express_1.Router();
router.post("/login", AuthController_1.login);
router.post("/register", AuthController_1.register);
exports.default = router;
