const { resetPassword, updateUser,newPassword, forgotPassword } = require("../controllers/userController");
const { auth } = require("../middleware/auth");

const router = require("express").Router();


router.post("/reset-password",auth,resetPassword);
router.post("/update-user",auth,updateUser);
router.post("/new-password",newPassword);
router.post("/forgot-password",forgotPassword);



module.exports = router;