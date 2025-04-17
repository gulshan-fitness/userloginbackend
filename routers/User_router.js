



const user_controller = require("../Controlers/User_controller")


express = require("express")


const User_router = express.Router()



User_router.post(
    "/sign_up",
(req,res)=>{
    
    

        const result = new user_controller().sign_up(req.body)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)

User_router.post(
    "/login",

(req,res)=>{
    
    

        const result = new user_controller().login(req.body)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)
User_router.post(
    "/loginWithOtp",

(req,res)=>{
    
    

        const result = new user_controller().loginWithOtp(req.body)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )



    }

)



module.exports= User_router 