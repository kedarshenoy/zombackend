// const controlers =require("../Controlers/index")
const locationcontroler =require("../Controlers/location")
const mealtype =require("../Controlers/Mealtype")
const reastaurants = require("../Controlers/restaurants")
const menucontroler = require("../Controlers/menu")
const usercontroler=require("../Controlers/User")
const ordercontroler=require('../Controlers/orders')

const express=require('express');
const router=express.Router();

router.get("/", (req, res) => {
    res.send('Hello World!')
    // res.sendFile("index.html", { root: __dirname });
  });


// router.get('/restaurants', controlers.getAllRestaurants);
// router.get('/restaurantsbycity/:city',controlers.getAllRestaurantsbycity);

router.get('/restaurantsm', reastaurants.getAllRestaurants);
router.get('/restaurantsbycitym/:city',reastaurants.getAllRestaurantsbycity);
router.get('/restaurantsbyidm/:id',reastaurants.getAllRestaurantsbyid);
router.post('/filterrestaurants',reastaurants.filterRestaurants);

router.get('/menu',menucontroler.getmenu);
router.get('/orders',ordercontroler.getAllorderdetails)
router.post('/saveorder',ordercontroler.saveorderdetail)


router.get('/users',usercontroler.getusersname)
router.post('/login',usercontroler.login);
router.post('/signup',usercontroler.signUp);


router.get('/location', locationcontroler.getLocations);
router.get('/mealtype',mealtype.getmealtypes);



module.exports=router;
