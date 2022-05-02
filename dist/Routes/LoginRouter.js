"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../Controllers/LoginController");
const router = new express_1.Router();
router.post("/login", LoginController_1.login);
exports.default = router;
