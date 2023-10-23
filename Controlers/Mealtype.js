
const mealtypes=require('../Models/mealtype')


exports.getmealtypes =(req,res)=>{
    mealtypes.find().then(
        result =>{
            res.status(200).json({
                message:"meal types",
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