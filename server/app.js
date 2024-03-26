const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./Connection");
const router = require("./src/routes/Api");
const authRouter = require("./src/middleware/AuthVerification");
const studentsRouter = require("./src/routes/studentApi");
const bookRouter = require("./src/routes/bookApi");
// const bodyParser = require("body-parser");

//middleware :
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: `http://localhost:5174`,
    credentials: true,
  })
);
// app.use(cors());
app.use(cookieParser());
//Database connection :
connection();
//default routing:
app.use("/api/v1", router);
app.use("/auth", authRouter);
app.use("/student", studentsRouter);
app.use("/book", bookRouter);
//Undefined Route
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

module.exports = app;
