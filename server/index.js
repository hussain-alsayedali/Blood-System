const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = new PrismaClient();

const passport = require("passport");
const expressSession = require("express-session");

const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const path = require("path");

// Routes
const mainRoutes = require("./routes/main");
const nurseRoutes = require("./routes/nurse");
const donorRoutes = require("./routes/donor");
const recipientRoutes = require("./routes/recipient");

const guestRoutes = require("./routes/guest");

const cors = require("cors");
const bodyParser = require("body-parser");
const { data } = require("autoprefixer");
const nodemailer = require("nodemailer");

//const authController = require("./controllers/auth");

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://bloodwave.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // If you need to allow credentials (e.g., cookies)

  next();
});

//enablieng cors
app.use(
  cors({
    origin: "https://bloodwave.netlify.app", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.static(path.join(__dirname, "public")));
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Static Folder
app.use(express.static("public"));

//Body Parsing

app
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(express.json({ limit: "1mb" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

app.use(
  expressSession({
    cookie: {
      maxAge: 60 * 1000 * 100, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 30 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// Setup Routes For Which The Server Is Listening  منين منين
app.use("/", mainRoutes);
app.use("/nurse", nurseRoutes);
app.use("/donor", donorRoutes);
app.use("/recipient", recipientRoutes);
app.use("/guest", guestRoutes);

//Setup Routes For Which The Server Is Listening

async function main() {
  console.log("منين منين  منين منين");
  // const donor = await prisma.donor.create({
  //   data: {
  //     bankId: "1s2jagen12qw1xw",
  //     email: "mzowwasgenxsaw@agmajils.com",
  //     phone: "11a52xz1jgenw223",
  //     weight: 99,
  //     birth: new Date(),
  //     address: "almnia",
  //     firstName: "ahmed",
  //     lastName: "mohsen",
  //     password: "123456789",
  //     bloodType: "A-",
  //   },
  // });
  // for (let i = 0; i < 60; i++) {
  //   await prisma.bloodBag.create({
  //     data: {
  //       donorId: donor.id,
  //     },
  //   });
  // }

  // console.log("finished");
}
main();

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

module.exports = app;
