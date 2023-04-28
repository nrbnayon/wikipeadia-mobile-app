require("express-async-errors")
require("dotenv").config();

require("./db");
const express = require('express');
// const morgan = require("morgan");
const postRouter = require("./routers/post");

const cors =require("cors");

const app = express();
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
// app.use(morgan("dev"));
app.use("/api/post", postRouter);

app.use((err, req, res, next) => {
    res.status(500).json({error: err.message});
});

const PORT = 4848;

app.listen(PORT, () => {
    console.log("Port is listining " + PORT);
});