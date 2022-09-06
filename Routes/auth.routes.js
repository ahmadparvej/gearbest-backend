const {Router} = require("express")
const UserModel = require("../Models/user")
const authRouter = Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

authRouter.post("/signup",async(req,res)=>{
    try {
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(req.body.password,salt)

        const user = await UserModel({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        
        user.save((err,success)=>{
            if(err){
                console.log(err);
              return res.status(500).send({message:"Error occurred"})
            }
            res.send({message:"success"})
        });  
    } catch (error) {
        console.log(error);
        res.status(400).send({status:"error",error:"Invalid Entry"})
    }
})


authRouter.post("/login", async (req,res)=>{
    const user  = await UserModel.findOne({email:req.body.email}).lean()
    if(user===null){
        return res.status(400).send("Cannot find user")
    }
    console.log(user);
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            // sending static token for now
            // implementing in future with jwt-token
            res.status(200).send({status:"success",token:"12345"})
        }else{
            res.status(400).send("Wrong Password")
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = authRouter;