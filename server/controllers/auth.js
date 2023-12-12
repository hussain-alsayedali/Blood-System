const passport = require("passport");
const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLoginNurse = (req, res, next) => {
  console.log("entered the login");
  console.log(req.body);
  passport.authenticate("nurse", (err, user, info) => {
    if (err) {
      console.log("first err" + err);

      return next(err);
    }
    if (!user) {
      console.log("second err" + err);
      req.flash("errors", { msg: "Invalid email or password." });
      return res.redirect("/login");
    }
    // Compare the provided password with the stored hashed password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (isMatch) {
        req.logIn(user, (err) => {
          if (err) {
            console.log(err);

            return next(err);
          }
          res.json("true");
          // res.redirect("/profile");
        });
      } else {
        console.log("last err");

        req.flash("errors", { msg: "Invalid email or password." });
        res.redirect("/login");
      }
    });
  })(req, res, next);
};
exports.postLoginDonor = (req, res, next) => {
  console.log("entered the login");
  console.log(req.body);
  passport.authenticate("donor", (err, user, info) => {
    if (err) {
      console.log("first err" + err);

      return next(err);
    }
    if (!user) {
      console.log("second err" + err);
      req.flash("errors", { msg: "Invalid email or password." });
      return res.redirect("/login");
    }
    // Compare the provided password with the stored hashed password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (isMatch) {
        req.logIn(user, (err) => {
          if (err) {
            console.log(err);

            return next(err);
          }
          res.json("true");
          // res.redirect("/profile");
        });
      } else {
        console.log("last err");

        req.flash("errors", { msg: "Invalid email or password." });
        res.redirect("/login");
      }
    });
  })(req, res, next);
};
exports.postLoginRecipient = (req, res, next) => {
  console.log("entered the login");
  console.log(req.body);
  passport.authenticate("recipient", (err, user, info) => {
    if (err) {
      console.log("first err" + err);

      return next(err);
    }
    if (!user) {
      console.log("second err" + err);
      req.flash("errors", { msg: "Invalid email or password." });
      return res.redirect("/login");
    }
    // Compare the provided password with the stored hashed password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (isMatch) {
        req.logIn(user, (err) => {
          if (err) {
            console.log(err);

            return next(err);
          }
          res.json("true");
          // res.redirect("/profile");
        });
      } else {
        console.log("last err");

        req.flash("errors", { msg: "Invalid email or password." });
        res.redirect("/login");
      }
    });
  })(req, res, next);
};
exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignupDonator = async (req, res, next) => {
  console.log(req.body);
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    console.log("there is many errors" + validationErrors);
    // return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await prisma.donor.findFirst({
      where: {
        OR: [{ email: req.body.email }],
      },
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      console.log(
        "Account with that email address or username already exists."
      );
      return res.redirect("../signup");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const donator = await prisma.donor.create({
      data: {
        bankId: req.body.bankId,
        email: req.body.email,
        phone: req.body.phone,
        weight: parseFloat(req.body.weight),
        birth: new Date(req.body.birth),
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        bloodType: req.body.bloodType,
      },
    });
    await prisma.$disconnect();

    req.logIn(donator, (err) => {
      if (err) {
        return next(err);
      }
      // res.redirect("/profile");
      console.log("redirect");
    });
  } catch (error) {
    return next(error);
  }
};

exports.postSignupNurse = async (req, res, next) => {
  console.log(req.body);
  console.log(req.session);
  console.log("meow");
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });

  if (validationErrors.length) {
    console.log("err");

    req.flash("errors", validationErrors);
    // return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await prisma.nurse.findFirst({
      where: {
        OR: [{ email: req.body.email }],
      },
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      console.log("err2");
      res.json("err2");

      // return res.redirect("../signup");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let numWeight = parseFloat(req.body.weight);
    const currentNurse = await prisma.nurse.create({
      data: {
        bankId: req.body.bankId,
        email: req.body.email,
        phone: req.body.phone,
        weight: numWeight,
        birth: new Date(req.body.birth),
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      },
    });
    await prisma.$disconnect();

    req.logIn(currentNurse, (err) => {
      if (err) {
        console.log("err");
        return next(err);
      }
      // /profile
      //res.json("err2");
      res.json("succes");
      // res.redirect("/profile");
    });
  } catch (error) {
    return next(error);
  }
};
exports.postSignupRecipient = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await prisma.recipient.findFirst({
      where: {
        OR: [{ email: req.body.email }],
      },
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const currentRecipient = await prisma.recipient.create({
      data: {
        currentUrgency: req.body.currentUrgency,
        bankId: req.body.bankId,
        email: req.body.email,
        phone: req.body.phone,
        weight: parseFloat(req.body.weight),
        birth: new Date(req.body.birth),
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        bloodType: req.body.bloodType,
      },
    });
    await prisma.$disconnect();
    req.logIn(currentRecipient, (err) => {
      if (err) {
        return next(err);
      }

      // res.redirect("/profile");
      res.json("true");
    });
  } catch (error) {
    return next(error);
  }
};
