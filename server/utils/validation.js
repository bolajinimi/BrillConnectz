const Joi = require("joi");
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
        phoneNumber: Joi.string().required().label("Phone Number"),
		password: Joi.string().required().label("Password"),
        interest:Joi.string().required().label("interest")
	});
	return schema.validate(data);
};

module.exports={validate}