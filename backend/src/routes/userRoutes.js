const { Router } = require("express");

const router = Router();

const {
  createUser,
  authenticateUser,
  getUserByName,
  getAllUsers,
  confirmAccount,
  resetPassword,
  testToken,
  newPassword,
  profile,
} = require("../controllers/usersControllers/userController");

const { checkAuth } = require("../middleware/checkAuth");

//Autenticacion , registro y confirmacion de usuarios

router.get("/", getAllUsers);
router.get("/name", getUserByName);

router.post("/", createUser);
router.post("/login", authenticateUser);
router.post("/confirm/:token", confirmAccount);
router.get("/profile", checkAuth, profile);
router.post("/reset-password", resetPassword);
router.route("/reset-password/:token").get(testToken).post(newPassword);

router.put("/");

router.delete("/");

module.exports = router;
