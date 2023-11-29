const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
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

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", { msg: "Invalid email or password." });
      return res.redirect("/login");
    }
    // Compare the provided password with the stored hashed password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        return next(err);
      }
      if (isMatch) {
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      } else {
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
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await prisma.donor.findFirst({
      where: {
        OR: [{ email: req.body.email }, { userName: req.body.userName }],
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

    const donator = await prisma.donor.create({
      data: {
        bankId: req.body.bankId,
        email: req.body.email,
        phone: req.body.phone,
        weight: req.body.weight,
        birth: req.body.birth,
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
      res.redirect("/profile");
    });
  } catch (error) {
    return next(error);
  }
};

exports.postSignupNurse = async (req, res, next) => {
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
    const existingUser = await prisma.nurse.findFirst({
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

    const currentNurse = await prisma.nurse.create({
      data: {
        bankId: req.body.bankId,
        email: req.body.email,
        phone: req.body.phone,
        weight: req.body.weight,
        birth: req.body.birth,
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      },
    });
    await prisma.$disconnect();

    req.logIn(currentNurse, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/profile");
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
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

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
        OR: [{ email: req.body.email }, { userName: req.body.userName }],
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
        currentUrgency: req.body.urgency,
        bankId: req.body.bankId,
        email: req.body.email,
        phone: req.body.phone,
        weight: req.body.weight,
        birth: req.body.birth,
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

      res.redirect("/profile");
    });
  } catch (error) {
    return next(error);
  }
};
