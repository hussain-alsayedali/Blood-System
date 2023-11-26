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
const mainRoutes = require("./routes/main");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config/.env" });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);

app.use(logger("dev"));
app.use(methodOverride("_method"));

app.use(
  expressSession({
    cookie: {
      maxAge: 60 * 1000, // ms
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

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", mainRoutes);

app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  console.log("Trying to check the user.. hold on.");
  let user;
  switch (role) {
    case "nurse":
      user = await prisma.nurse.findUnique({
        where: {
          username: username,
        },
      });
      break;
    case "donor":
      user = await prisma.donor.findUnique({
        where: {
          username: username,
        },
      });
      break;
    case "recipient":
      user = await prisma.recipient.findUnique({
        where: {
          username: username,
        },
      });
      break;
    default:
      return res.status(400).json({ error: "Invalid role" });
  }

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.json({ user });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

module.exports = app;
