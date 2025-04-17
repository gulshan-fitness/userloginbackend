const mongoose= require("mongoose")

const otpSchema=new mongoose.Schema({


    

    phone:{
        type:Number,
        require:true
    },



    otp:{
        type:Number,
        require:true
    },



},

{timestamps:true}

)



module.exports= mongoose.model("Otp",otpSchema)