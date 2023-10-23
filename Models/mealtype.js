
const mongoose =require('mongoose')


const Scheema= mongoose.Schema;

const mealtypeScheema= new Scheema(
    {
        _id:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
    }
)


module.exports =mongoose.model('mealtype',mealtypeScheema,'mealtype');




