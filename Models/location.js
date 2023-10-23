const mongoose =require('mongoose');
// const { required } = require('nodemon/lib/config');

const Schema =mongoose.Schema;
// create schema 
const locationSchema =new Schema(
{
    _id: {
        type:String,
        required: false,
    },
    name: {
        type:String,
        required:true,
    },
    city_id: {
        type:String,
        required:false,
    },
    location_id: {
        type:String,
        required:false,
    },
    country_name: {
        type:String,
        required:false,
    }
}
);


// export Scheema 
module.exports =mongoose.model('location',locationSchema,'locations');



