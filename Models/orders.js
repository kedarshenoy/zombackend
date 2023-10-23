const mongoose=require('mongoose');
const Scheema =mongoose.Schema;

const oredermodel =new Scheema(
    {
        restauarant:{
            type:String,
            required:true
        },
        addr:{
            type:String,
            required:true
        },
        food:{
            type:Array,
            required:true
        },
        cost:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        }
    }
)

module.exports=mongoose.model('ordermodel',oredermodel,'orders')