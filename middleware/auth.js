module.exports = {
  ensureAuth: function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("errors", "login to access the another page");
      res.redirect("/feed?type=all&page=0&sort=createdAt_desc");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
  isAuthed: function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
  },
};
