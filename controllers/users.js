const User = require("../models/user");

// rendering signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};
// rendering login form
module.exports.renderloginForm = (req, res) => {
  res.render("users/login.ejs");
};

//signup route
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Your'e successully logged out!");
    res.redirect("/listings");
  });
};
