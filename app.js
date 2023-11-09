require("dotenv").config();
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");
const mongoose = require('mongoose');

process.on("uncaughtException", (err) => {
  console.log("Error uncaught exception", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow_headers', 'Content-Type, Authorization');
    next();
});

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const msg = error.message || "Unknown Error Occurred!";
  const data = error.data;

  res.status(status).json({
    msg: msg,
    data: data,
  });
});
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT || 4000);
}).catch((err) => {
    console.log(err);
})

