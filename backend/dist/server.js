"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var products_1 = require("./routes/api/products");
var users_1 = __importDefault(require("./routes/api/users"));
var order_1 = __importDefault(require("./routes/api/order"));
var app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//end points 
app.use('/api', users_1.default);
app.use('/api', products_1.productRoutes);
app.use('/api', order_1.default);
var port = process.env.port;
app.listen(port, function () {
    console.log("listening on port:".concat(port));
});
