import express from "express";
import cors from "cors";
import routes from "./routes/intex.js";
import authRoutes from "./modules/Auth/auth.routes.js"


const app = express();


app.use("/api/auth", authRoutes);


app.use(cors());
app.use(express.json());

app.use("/api", routes);

export default app;
