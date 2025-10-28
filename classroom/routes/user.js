const express = require("express");
const router = express.Router();

//users
//index
router.get("/", (req, res) => {
  res.send("GET for users");
});

// show
router.get("/:id", (Req, res) => {
  res.send("GET for user id ");
});

//post route
router.post("/", (req, res) => {
  res.send("post for users");
});
// DELETE users
router.delete("/:id", (req, res) => {
  res.send("DELETE for user id");
});

module.exports = router;
