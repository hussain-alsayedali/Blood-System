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
          const user = await prisma.nurse.findUnique({
            where: { email: email },
          });
          if (!user) {
            return done(null, false, { message: "Invalid nurse email." });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
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
    // Serialize the user based on a unique identifier (e.g., user ID)
    done(null, { id: user.id, type: user.type });
  });

  passport.deserializeUser(async (serializedUser, done) => {
    try {
      let userType = serializedUser.type;

      if (userType === "recipient") {
        user = await prisma.recipient.findUnique({
          where: {
            id: serializedUser.id,
          },
        });
        done(null, user);
      } else if (userType === "donor") {
        user = await prisma.donor.findUnique({
          where: {
            id: serializedUser.id,
          },
        });
        done(null, user);
      } else {
        user = await prisma.nurse.findUnique({
          where: {
            id: serializedUser.id,
          },
        });

        done(null, user);
      }
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  });
};
