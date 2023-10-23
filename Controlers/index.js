const restaurantList = require("../Models/restaurants.json");
const locations= require('../Models/location');

exports.getAllRestaurants = (req, res) => {
res.status(200).json({ list: restaurantList });
}

exports.getAllRestaurantsbycity =(req,res) =>{
let selectedcity =req.params.city;
let hotelsintheselectedcity =  restaurantList.filter(rest =>rest.city==selectedcity)
res.send(hotelsintheselectedcity);

}


exports.getLocations =(req,res)=>{
    locations.find().then(
        result =>{
            res.status(200).json({
                message:"location fetched",
                location:result
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