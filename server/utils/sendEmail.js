const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USERNAME,
				pass: process.env.PASSWORD,
			},
                tls: {rejectUnauthorized: false}
            
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
        
	} catch (error) {
        console.log(process.env.USER);
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};