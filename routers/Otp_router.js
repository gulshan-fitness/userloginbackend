


const otp_controller = require("../Controlers/Otp_controller");

const authenticateToken = require("../Authentication")


const express = require("express")

const otp_router=express.Router()


otp_router.post(
    "/otp_send",
    (req,res)=>{

 const result= new otp_controller().otp_send(req.body)

result.then(

    (succes)=>{

res.send(succes)
    }
)




.catch(
    (error)=>{
        res.send(error)

    }
)

    }
)


otp_router.post(

    "/otp_verify",

    (req,res)=>{


        const result= new otp_controller().otp_verify(req.body)

result.then(
    (succes)=>{

res.send(succes)
    }
)
.catch(
    (error)=>{
        res.send(error)

    }
)

    }
)



module.exports=otp_router