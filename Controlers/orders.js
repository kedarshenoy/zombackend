const oredermodel =require('../Models/orders')

exports.getAllorderdetails=(req,res)=>{
    oredermodel.find().sort({date:-1}).then(
        result=>{
            res.status(200).json({
                message:"orders fetched ",
                orders:result
            })
        }
    )
}

exports.saveorderdetail=(req,res)=>{

    const{
        restauarant,
        addr,
        food,
        cost,
        date
    }=req.body;

    const ordersobj =new oredermodel({
        restauarant:restauarant,
        food:food,
        cost:cost,
        addr:addr,
        date:date
    });

    ordersobj.save().then(
        response=>{
            res.status(200).json({
                message:"order saved successfully",
                user:response
            })
        }
    ).catch(
         error=>{
            res.json({
                message:"failed",
                error:error

            })
         }
            );



}