import express from "express";
import productRoutes from "./routes/products-routes";
import { json } from "body-parser";

const app = express();
const PORT = 3000;

app.use(json());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
