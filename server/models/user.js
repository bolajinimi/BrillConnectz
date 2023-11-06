const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username:{type: String, required: true },
    phoneNumber: { type: String, required: true },
	password: { type: String, required: true },
	interest:{type: String, required: true},
	otp:{type: String, required: true},
	otp_expiry_date:{type:Date,required:true},
	verified:{type:Boolean,required:true,defaultValue:false}
});

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: "3d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User};