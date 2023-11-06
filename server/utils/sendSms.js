
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const AdminPhone =process.env.TWILIO_PHONE;

const sendOtp = async (otp, toPhoneNumber) => {
   try {
     const client = require("twilio")(accountSid, authToken);
    const response = await client.messages.create({
      body: `Your verification code is ${otp}`,
      to: toPhoneNumber,
      from: AdminPhone,
    });
    return response;
   } catch (error) {
    console.log(error)
   }
  };
module.exports.sendOtp = sendOtp;
