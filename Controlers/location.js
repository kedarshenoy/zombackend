// const restaurantList = require("../Models/restaurants.json");
const locations= require('../Models/location');


exports.getLocations =(req,res)=>{
    locations.find().then(
        result =>{
            res.status(200).json({
                message:"location fetched",
                location: result,
            });
        }
    ).catch(
        error=>{
            res.status(500).json({
                message:"error in database",
                error:error
            });
        }
    );
}