const express = require("express");
const { createEventController } = require("../controllers/eventController");
const { isSignedIn } = require("../controllers/userController");

const router = express.Router();

router.post("/create-event", isSignedIn, createEventController);

module.exports = router;
