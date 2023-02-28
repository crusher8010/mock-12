const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const productRoute = require("./Routes/productRoute");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.use("/", productRoute);

const DB = process.env.URL.replace('<password>', process.env.password);
mongoose.connect(DB).then(() => console.log("Database Connected")).catch((err) => console.log("Database Not Connected"));

let port = process.env.port;
app.listen(port, () => {
    console.log(`Port is running on ${port} port`);
})