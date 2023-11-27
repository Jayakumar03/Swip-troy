const express = require("express");
const app = express();
const mongoDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["post", "get", "put", "delete"],
    credentials: true,
  })
);

// ? Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const fileUpload = require("express-fileupload");

require("dotenv").config();
mongoDB();

// Import all routes here
const user = require("./routes/user");
const stories = require("./routes/stories");

// Router Middleware
app.use("/api/v1/", user);
app.use("/api/v1/stories/", stories);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Health api
app.get("/health", (req, res) => {
  res.status(200);
  console.log("Health is good");
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Home</h1>");
});
