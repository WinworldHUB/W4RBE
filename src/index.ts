import express from "express";
import productRoutes from "./routes/products-routes";
import memberRoutes from "./routes/members-routes";
import orderRoutes from "./routes/orders-routes";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://main.dt2z8g98byon5.amplifyapp.com/",
    "http://localhost:3001",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.header("Access-Control-Allow-Credentials", "true");
  return next();
});

app.use("/products", productRoutes);
app.use("/members", memberRoutes);
app.use("/orders", orderRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
