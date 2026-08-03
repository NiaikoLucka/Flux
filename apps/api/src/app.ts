import express from "express";
import cors from "cors";
import routes from "./routes/intex.js";
import authRoutes from "./modules/Auth/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);

app.use(express.json());

app.use("/api", routes);

export default app;
