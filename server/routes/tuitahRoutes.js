const express = require("express");
const { validate } = require("express-validation");
const {
  addTuitah,
  getTuitah,
  likeTuitah,
  deleteTuitah,
  getTuitById
} = require("../controller/tuitahController");
const tuitahValidation = require("../schemas/tuitahSchema");

const router = express.Router();

router.get("/all", getTuitah);

router.get("/tuit/:id", getTuitById)

router.post("/add", validate(tuitahValidation), addTuitah);

router.patch("/like", likeTuitah);

router.delete("/delete", deleteTuitah);

module.exports = router;
