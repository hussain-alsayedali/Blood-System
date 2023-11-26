console.log("server.js");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  console.log("inside server.js");
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

app.listen(2121, () =>
  console.log("Server is running on http://localhost:2121")
);
