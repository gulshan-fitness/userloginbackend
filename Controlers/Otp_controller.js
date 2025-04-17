
const twilio =require("twilio");
const otp_model = require("../models/Otp_model");








class otp_controller {
  otp_send(data) {
    console.log(data);
    
    return new Promise(async (resolve, reject) => {

      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
     

      try {
        const otpValue = (length = 6) => {
          return Math.floor(100000 + Math.random() * 900000); // Returns a number
        };

        const generateOTP = otpValue();

        const exist_contact = await otp_model.findOne({ phone: data.phone });

        if (exist_contact) {
         
            await otp_model.updateOne(
              { phone: data.phone },
              {
                otp: generateOTP,
              }
            );

            await client.messages.create({
              body: `Your OTP code is ${generateOTP}`,
              from: process.env.TWILIO_PHONE_NUMBER,
              to:  data.phone,
          });

            resolve({
              msg: `please check otp on your phone ${data.phone}`,
              status: 1,
            });

          }

          else {
            const otp = otp_model({
              phone: data.phone,
              otp: generateOTP,
            });

            await otp.save();

            await client.messages.create({
              body: `Your OTP code is ${generateOTP}`,
              from: process.env.TWILIO_PHONE_NUMBER,
              to:  data.phone,
          });

            resolve({
              msg: `please check otp on your mobile ${data.phone}`,
              status: 1,
            });
          }


        
      } catch (error) {
        console.log(error);
        
        reject({ msg: "internel error", status: 0 });
      }
    });
  }

  otp_verify(data) {

    

    return new Promise(async (resolve, reject) => {
      try {
        const otp_verify = await otp_model.findOne({
          phone: data.phone,
          otp: data.otp,
        });

        if (otp_verify) {
          resolve({ msg: "otp is correct", status: 1 });
        } else {
          reject({ msg: "otp is not correct", status: 0 });
        }
      } catch (error) {
        reject({ msg: "internel error", status: 0 });
      }
    });
  }
}

module.exports = otp_controller;
