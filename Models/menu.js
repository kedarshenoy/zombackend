const mongoose =require('mongoose');
const Scheema =mongoose.Schema;

const menumodel =new Scheema(
    {
        restaurantId:{
            type:String,
            required:true,
        },
        itemPrice:{
            type:Number,
            required:true,
        },
        itemName:{
            type:String,
            required:true,
        },
        itemDescription:{
            type:String,
            required:true,
        },
        isVeg:{
            type:Boolean,
            required:true,
        },
    }
)


module.exports=mongoose.model('menu',menumodel,'menu')