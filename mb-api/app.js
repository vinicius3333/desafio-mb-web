import { join } from "path";
import { existsSync } from "fs";
import { __dirname } from "./src/utils/get-dirname.js"
import express from "express";

import registrationRoute from "./src/routes/registration.route.js";

const app = express()
const port = 3000
const assetsFront = join("public/assets")

if (!existsSync(assetsFront)) {
  console.error("Don't found assets folder...")
  process.exit()
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173")
  res.header("Access-Control-Allow-Methods", "GET, POST")
  res.header("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json())

app.use("/assets", express.static(assetsFront))

app.use("/registration", registrationRoute);

app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: "Route not found",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening http://localhost:${port}`)
});