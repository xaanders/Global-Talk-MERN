const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require("passport");
const users = require("./router/users");
const words = require("./router/words");
const profiles = require("./router/profiles");
const cors = require("cors");

require('dotenv').config();
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true
}))
// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded());

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', true);
mongoose.connect(uri, { useNewUrlParser: true })
.then(() => console.log("MongoDB database connection established successfully"))
.catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/router/users", users);
app.use("/router/words", words);
app.use("/router/profiles", profiles);


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));