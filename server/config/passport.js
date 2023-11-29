const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = function (passport) {
  passport.use(
    "donor",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const donor = await prisma.donor.findUnique({
            where: { email: email },
          });
          if (!donor) {
            return done(null, false, { message: "Invalid donor email." });
          }
          const isMatch = await bcrypt.compare(password, donor.password);
          if (isMatch) {
            return done(null, donor);
          }
          return done(null, false, { message: "Invalid donor password." });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "recipient",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const recipient = await prisma.recipient.findUnique({
            where: { email: email },
          });
          if (!recipient) {
            return done(null, false, { message: "Invalid recipient email." });
          }
          const isMatch = await bcrypt.compare(password, recipient.password);
          if (isMatch) {
            return done(null, recipient);
          }
          return done(null, false, { message: "Invalid recipient password." });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "nurse",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const nurse = await prisma.nurse.findUnique({
            where: { nurseEmail: email },
          });
          if (!nurse) {
            return done(null, false, { message: "Invalid nurse email." });
          }
          const isMatch = await bcrypt.compare(password, nurse.password);
          if (isMatch) {
            return done(null, nurse);
          }
          return done(null, false, { message: "Invalid nurse password." });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize and deserialize logic for each user type

  passport.serializeUser((user, done) => {
    const isNurse = prisma.$exists.nurse({
      id: user.id,
    });
    const isDonor = prisma.$exists.donor({
      id: user.id,
    });
    const isRecipient = prisma.$exists.donor({
      id: user.id,
    });
    let userType = null;
    if (isNurse) {
      userType = "nurse";
    } else if (isDonor) {
      userType = "donor";
    } else {
      userType = "recipient";
    }
    done(null, { id: user.id, type: userType });
  });

  passport.deserializeUser(async (serializedUser, done) => {
    const { id, type } = serializedUser;
    try {
      let user = null;
      if (type === "donor") {
        user = await prisma.donor.findUnique({ where: { id } });
      } else if (type === "recipient") {
        user = await prisma.recipient.findUnique({ where: { id } });
      } else if (type === "nurse") {
        user = await prisma.nurse.findUnique({ where: { id } });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
