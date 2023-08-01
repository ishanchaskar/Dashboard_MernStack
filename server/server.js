const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
app.use("/api/users",usersRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});