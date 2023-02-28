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

let dbConnection = process.env.Url.replace("<password>", process.env.password);
mongoose.connect(dbConnection).then(() => console.log("Data Base is Connected")).catch((err) => console.log("Data Base Connection Failed"));

let port = process.env.port;
app.listen(port, () => {
    console.log(`Port is running on ${port} port`);
})