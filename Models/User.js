const mongoose = require("mongoose");


const Scheema=mongoose.Schema;

const userScheema=new Scheema(
    {
       
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model("User",userScheema,"user");

