const router = require("express").Router();


const { login, register, verifyMail } = require("../controllers/authController");

router.post("/",login);
router.post("/register", register);
router.post("/verify",verifyMail);


module.exports = router;