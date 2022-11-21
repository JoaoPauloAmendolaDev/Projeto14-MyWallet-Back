import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import extractRoutes from "./routes/extract.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use(extractRoutes);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`server running in port: ${port}`));
