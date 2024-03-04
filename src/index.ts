import express from "express";
import { json } from "body-parser";
import cors from "cors"
import productRoutes from "./routes/products-routes";
import memberRoutes from "./routes/members-routes";
import orderRoutes from "./routes/orders-routes";
const app = express();
const PORT = 3000;

// app.use(json());
app.use(express.json({ limit: "10mb" }));
app.use(cors({origin:"http://localhost:3001"}))
app.use("/products", productRoutes);
app.use("/members", memberRoutes);
app.use("/orders",orderRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
