"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const Routes_1 = __importDefault(require("./Routes/Routes"));
const port = process.env.PORT || 5000;
dotenv_1.default.config();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(process.env.MONGO_URL || process.env.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.use(Routes_1.default);
app.use("/", (req, res) => res.send("404 not found"));
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
