const express = require("express");
const router = express.Router();

//posts
//index
router.get("/", (req, res) => {
  res.send("GET for posts");
});

// show
router.get("/:id", (Req, res) => {
  res.send("GET for posts id ");
});

//post route
router.post("/", (req, res) => {
  res.send("post for posts");
});
// DELETE users
router.delete("/:id", (req, res) => {
  res.send("DELETE for post id");
});

module.exports = router;
