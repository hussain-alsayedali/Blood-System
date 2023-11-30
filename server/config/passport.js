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
          const currentNurse = await prisma.nurse.findUnique({
            where: { email: email },
          });
          if (!currentNurse) {
            return done(null, false, { message: "Invalid nurse email." });
          }
          const isMatch = await bcrypt.compare(password, currentNurse.password);
          if (isMatch) {
            return done(null, currentNurse);
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
    console.log(user);
    // const isNurse = prisma.nurse.findUnique({ where: { id: user.id } });
    // const isDonor = prisma.donor.findUnique({ where: { id: user.id } });
    // const isRecipient = prisma.recipient.findUnique({ where: { id: user.id } });

    // Promise.all([isNurse, isDonor, isRecipient]).then(
    //   ([nurse, donor, recipient]) => {
    //     let userType = null;
    //     if (nurse) {
    //       userType = "nurse";
    //     } else if (donor) {
    //       userType = "donor";
    //     } else if (recipient) {
    //       userType = "recipient";
    //     }
    //     done(null, { id: user.id, type: userType });
    //     // done(null, { id: user.id, type: userType });
    //   }
    // );
    done(null, user);
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
