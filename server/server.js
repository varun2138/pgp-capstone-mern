import app from "./src/app.js";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("hello");
    });
    app.listen(PORT, () => {
      console.log(`app is listenig at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!", err);
  });
