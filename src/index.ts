import express, { Request, Response, NextFunction } from "express";
import productRoutes from "./routes/products-routes";
import memberRoutes from "./routes/members-routes";
import orderRoutes from "./routes/orders-routes";
import invoiceRoutes from "./routes/invoices-routes";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    "https://main.dt2z8g98byon5.amplifyapp.com",
    "https://master.d212wzb60r31lk.amplifyapp.com",
    "https://bulk.wholesale4resale.com",
    "https://bulkadmin.wholesale4resale.com",
    "http://localhost:3002",
    "http://localhost:3001",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin ?? "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/products", productRoutes);
app.use("/members", memberRoutes);
app.use("/orders", orderRoutes);
app.use("/invoices", invoiceRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
