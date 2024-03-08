"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./routes/products-routes"));
const members_routes_1 = __importDefault(require("./routes/members-routes"));
const orders_routes_1 = __importDefault(require("./routes/orders-routes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json({ limit: "10mb" }));
app.use((req, res, next) => {
    const allowedOrigins = [
        "https://main.d3a3bx78s8tswk.amplifyapp.com",
        "http://localhost:3001",
        "http://localhost:3000",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return next();
});
app.use("/products", products_routes_1.default);
app.use("/members", members_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map