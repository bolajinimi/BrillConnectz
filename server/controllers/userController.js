const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const { generateToken, verifyToken, generateOtp } = require("../utils/utils");
const { sendOtp } = require("../utils/sendSms");
const sendEmail = require("../utils/sendEmail");

const resetPassword = async (req, res) => {
	try {
		const { id } = req.user;
		const user = await User.findById({ _id: id });
		const { oldPassword, newPassword, confirmPassword } = req.body;
		const validPassword = await bcrypt.compare(oldPassword, user.password);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });
		if (newPassword !== confirmPassword)
			return res
				.status(400)
				.json({ Error: "newPassword and confirmPassword does not match" });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(newPassword, salt);
		user.password = hashPassword;
		user.save();
		return res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: "Internal Server Error" });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.user;
		const { email, username } = req.body;
		const user = await User.findByIdAndUpdate(id, { email, username });
		user.save();
		res.status(200).json({ message: "user updated sucessfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		let user = await User.findOne({ email });
		if (!user) return res.status(409).send({ message: "Wrong email!" });
		const { otp, otp_expiry_date } = generateOtp();
		const token = await generateToken(user.id);
		user.otp = otp;
		user.otp_expiry_date = otp_expiry_date;
		user.save();
		await sendOtp(otp, user.phoneNumber);
		const url = `${process.env.BASE_URL}api/auth/verify?token=${token}`;
		await sendEmail(user.email, "Verify Email", url);

        return res.status(200).json({message:"Check email for verification url",token})
	} catch (error) {
        console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
    }
};

const newPassword = async (req, res) => {
	try {
		const { id } = req.user;
		const user = await User.findById({ _id: id });
		const { password, confirmPassword } = req.body;
		
		if (password !== confirmPassword)
			return res
				.status(400)
				.json({ Error: "newPassword and confirmPassword does not match" });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(password, salt);
		user.password = hashPassword;
		user.save();
		return res.status(200).json({ message: "New password successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ Error: "Internal Server Error" });
	}
};

module.exports = { resetPassword, updateUser,forgotPassword,newPassword};
