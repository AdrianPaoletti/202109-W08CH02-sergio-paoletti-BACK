const express = require("express");
const { addTuitah } = require("../controller/tuitahController");

const router = express.Router();

/* router.get("/all", getTuitah); */

router.post("/add", addTuitah);

/* router.patch("/like", likeTuitah);

router.delete("/delete", deleteTuitah); */

module.exports = router;
