const { User } = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { validate } = require("../utils/validation");
const { generateToken, verifyToken, generateOtp } = require("../utils/utils");
const { sendOtp } = require("../utils/sendSms");

const register = async (req, res) => {
	try {
		const { error } = validate(req.body);

		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const { otp, otp_expiry_date } = generateOtp();

		await sendOtp(otp, req.body.phoneNumber);

		user = await new User({
			...req.body,
			password: hashPassword,
			otp,
			otp_expiry_date,
		}).save();

		const token = await generateToken(user.id);
   
		// const token = generateToken(user.id)

		const url = `${process.env.BASE_URL}api/auth/verify?token=${token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.json({ message: "An Email sent to your account please verify", token:token });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const login = async (req, res) => {
	try {
		// const { error } = validate(req.body);
		// if (error)
		// 	return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

        if(!user.verified) return res.status(403).send({ message: "Kindly verify your email" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password,
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = await generateToken(user?.id);
		res
			.status(200)
			.send({ message: "logged in successfully", token });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const verifyMail = async (req, res) => {
	try {
		const token = req.query.token;
		const verified = await verifyToken(token);
		const { otp } = req.body;

		const user = await User.findOne({ _id: verified.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		if (otp !== user.otp && new Date() > user.otp_expiry_date)
			return res.status(400).send({ message: "Invalid or Expired otp" });

		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		// await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

module.exports = { login, register, verifyMail };
