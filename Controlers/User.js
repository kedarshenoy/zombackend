const User =require("../Models/User")

exports.getusersname =(req,res)=>{
    User.find().then(
        result=>{
            res.status(200).json({
                message:"Succecs",
                values:result
            });
        }
    )
    // .catch(
    //     res.json({
    //         message:"failed"
    //     })
    // )
}


exports.signUp =(req,res)=>{
    const reqBody =req.body;
    const {
        email,
        password,
        firstname,
        lastname
    }=req.body;

    const userobj =new User(
        {
            email: email,
            password:password,
            firstname:firstname,
            lastname:lastname
        }
    );

    userobj.save()
    .then(
        response=>{
            res.status(200).json({
                message:"user saved successfully",
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

exports.login =(req,res)=>{
    // const reqBody =req.body;
    const {
        email,
        password,
        
    }=req.body;


    User.find(
        {
            email:email,
            password:password
           
        }
    ).then(
        result=>{
            if(result.length>0){
                res.status(200).json({
                    message:"loged in successfully",
                    values:result
                });
                
                
            }

            else{
                res.status(400).json({
                message:"wrong credentials",
                values:result

                })
                
            }
        }
    ).catch(
         error=>{
            res.json({
                message:"wrongcredentials",
                error:error

            })
         }
            );
    
}