const express = require("express");
const { getSeatByScreenId } = require("../controllers/seat")


const router = express.Router();


router.get("/:screenId", getSeatByScreenId);


module.exports = router;