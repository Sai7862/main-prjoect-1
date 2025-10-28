const express = require("express");
const app = express();
const posts = require("./routes/post.js");
const users = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymos" } = req.query;
  req.session.name = name;
  console.log(req.session.name);
  if (name === "anonymos") {
    req.flash("error", "user not registered successfully!");
  } else {
    req.flash("success", "user registered successfully!");
  }
  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`you send request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successful");
// });

app.listen(3000, () => {
  console.log("seerver is running at http://localhost:3000");
});

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "namesthey");
//   res.cookie("madeIn", "india");
//   res.send("sending cookie to the data");
// });

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("color", "red", { signed: true });
//   res.send("signed cookie send");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("verified");
// });

// app.get("/greet", (req, res) => {
//   let { name = "anonymus" } = req.cookies;
//   res.send(`Hi!, ${name}`);
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//   res.send("hello i am root file");
// });

// app.use("/users", users);
// app.use("/posts", posts);
