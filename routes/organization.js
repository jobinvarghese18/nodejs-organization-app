const express = require("express");
const router = express.Router();
const {
  findOrganization,
  createOrganization,
  updateOrganization,
  removeOrganization,
} = require("../controllers/organization");

router.get("/", findOrganization);
router.post("/", createOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", removeOrganization);

module.exports = router;
