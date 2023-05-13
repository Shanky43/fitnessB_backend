const express = require("express");
const app = express();
const connection = require("./db");
require("dotenv").config()
const cors = require("cors");
const { userRouter } = require("./Routes/user.router");
const { ProductRoute } = require("./Routes/product.route");

const port = process.env.port || 7070;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/products",ProductRoute);

  app.listen(port, async () => {
    try {
      await connection;
      console.log("Connected To DB");
    } catch (err) {
      console.log("Cannot Connect to the DB");
    }
    console.log(`Server is running at ${port}`);
  });
  
