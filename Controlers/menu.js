const menumodel= require('../Models/menu')

exports.getmenu=(req,res)=>{
    menumodel.find().then(
        result=>{
            res.status(200).json({
                message:"Menu fetched",
                menu:result
            })
        }
        
    ).catch(error=>{
        console.log(error)
    })

}