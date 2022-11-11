const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/owner.controller");

const upload = require("../middlewares/upload-photo");

router
  .route("/")
  .get(ownerController.getAllOwners)
  .post("/", upload.single("photo"), ownerController.createOwner);

router.route("/:id").get(ownerController.getSingleOwner);

module.exports = router;
