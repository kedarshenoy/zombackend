const restaurants=require('../Models/restaurants')
 

exports.getAllRestaurants=(req,res)=>{
    restaurants.find().then(
        result =>{
            res.status(200).json({
                message:"All Restaurrants",
                location: result 
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



exports.getAllRestaurantsbycity =(req,res)=>{
    const cityselected = req.params.city;


    restaurants.find({city:cityselected}).then(
        result =>{
            res.status(200).json({  
                message:"All Restaurrants",
                location: result ,
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


exports.getAllRestaurantsbyid =(req,res)=>{
    const cityid =req.params.id;

    restaurants.find({_id:cityid}).then(

        result =>{
            res.status(200).json({
                message:"Restaurrant",
                location: result ,
            });
        }

    )
    .catch(
        error=>{
            res.status(500).json({
                message:"error in database",
                error:error
            });
        }
    )
}




exports.filterRestaurants = (req, res) => {
    const {
        cityid,
        mealtype,
        location,
        cuisine,
        hcost,
        lcost,
        sort,
        page 
    } = req.body;

    let filters = {};

    // add logic to apply filters

    if (mealtype) {
        filters['type.mealtype'] = mealtype;
    }

    if (cityid) {
        filters.city = cityid;
    }

    if (location) {
        filters.locality = location;
    }

    if (cuisine && cuisine.length > 0) {
        // cuisine.map((item)=>{
        //     filters['Cuisine.name']=item;
        // })
        filters['Cuisine.name']= {
                $in: cuisine
            };
       
        // cuisine.forEach(element => {
        // });
       
       
        // filters['Cuisine.name'] =
        //  {
        //     $in: cuisine
        // };
    }

    if ( lcost !== undefined && hcost !== undefined  ) {
        if (lcost ==0) {
            filters.cost = {
                $lt: hcost
            };
        } else if(lcost > 0){
            // console.log(lcost)
            filters.cost = {
                $gt: lcost,
                $lt: hcost
                
            }
        }
    }


    restaurants.find(filters).sort({ cost: sort }).then(result => {
        const page_size = 2;
        let temp;
        function paginate(array, page_size, page_number) {
            return array.slice((page_number - 1) * page_size, page_number * page_size);
        }
        temp = paginate(result, page_size, page);

        res.status(200).json({
            message: "Filtered restaurants",
            restaurants: temp,
            totalResultsCount: result.length,
            pageNo: page,
            pageSize: page_size
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    }); 
}
