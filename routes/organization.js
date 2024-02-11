const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/passport-jwt");
const { roleGuard } = require("../middleware/role-guard");
const validator = require("express-joi-validation").createValidator({});
const {
  findOrganization,
  createOrganization,
  updateOrganization,
  removeOrganization,
  createOrganizationSchema,
  updateOrganizationParams,
} = require("../controllers/organization");

router.get("/", authenticateJwt, roleGuard("admin"), findOrganization);

// for signup
router.get("/list", findOrganization);

router.post(
  "/",
  validator.body(createOrganizationSchema),
  authenticateJwt,
  roleGuard("admin"),
  createOrganization
);
router.put(
  "/:id",
  validator.params(updateOrganizationParams),
  authenticateJwt,
  roleGuard("admin"),
  updateOrganization
);
router.delete(
  "/:id",
  validator.params(updateOrganizationParams),
  authenticateJwt,
  roleGuard("admin"),
  removeOrganization
);

module.exports = router;
