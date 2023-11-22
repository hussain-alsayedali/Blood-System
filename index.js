const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const passport = require("passport");
const session = require("express-session");

const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
// const connectDB = require("./config/database");
const path = require("path");
const mainRoutes = require("./routes/main");
// const postRoutes = require("./routes/posts");
// const commentRoutes = require("./routes/comments")
// const feedRoutes = require("./routes/feeds")
const cors = require("cors");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
// require("./config/passport")(passport);

//Connect To Database
// connectDB();

//Using EJS for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

// Export the Express API
module.exports = app;

async function main() {
  const nurse = await prisma.nurse.create({
    data: {
      firstName: "feras",
      lastName: "aboAlli",
      bankId: "888",
      email: "meowmoew@gmail.com",
      phone: "0551238567",
      birth: new Date(1989, 1, 1),
      address: "qatif",
      weight: "999",
      username: "feras",
      password: "123456789",
    },
  });
  console.log(nurse);
}
// main()
//   .catch((e) => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
