const express = require("express");
const mongoose = require("mongoose")
const todoHandler = require("./routerHandler/todoHandler")

//Express App initialization
const app = express();
app.use(express.json())

//databse connected with mongoose
mongoose.connect("mongodb://localhost:27017/todoss",{useNewUrlParser: true,
useUnifiedTopology: true})
.then(()=>{
    console.log("Connect SuccessFul");
})
.catch((err)=>{
    log(err)

})
//Application Routers
app.use("/todo",todoHandler)

//Default error handler
function errorHandelar(err,req,res,next) {
    if (res.headersSent) {
        return next()
        
    }
    res.status(404).json({error:err})
    
}

app.listen(3000,()=>{
    console.log("App run Succes 3000");
})