
const express  = require ("express")
const http = require("http");  // Needed for WebSocket server
const cors = require("cors")
const mongoose =require ("mongoose");
const{ initSocket}=require("./Socket")

const user_router = require("./routers/User_router");


const otp_router = require("./routers/Otp_router");





const app = express();


const server=http.createServer(app) 



app.use(express.json());


app.use(express.static("public"))


require('dotenv').config()


app.use(cors())






app.get('/', (req, res) => {
    res.send('Backend is running');
  })




app.use("/user",user_router)



app.use("/otp",otp_router)






mongoose.connect(
    
    process.env.MONGODB_URL,

    {dbName:process.env.DB_NAME}
)
.then(

    ()=>{
        console.log("db conected")

        server.listen( process.env.PORT,()=>{

            initSocket(server)
            console.log("server started")
            

        })

    }

)

.catch(
    
    (error)=>{

        console.log(error); 

        console.log("db not conected ")
       

    }
)


