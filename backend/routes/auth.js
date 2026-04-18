const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
require("dotenv").config();
const router=express.Router()
         //  signup setup
router.post("/signup",(req,res)=>{
   
    const {name, username, password, phonenumber, email, location}=req.body;
    if(!name||!username||!password||!phonenumber||!email||!location){
        return res.status(400).json({success:false, message:"All fields are rquired!"} )
       }
    const checkSql="select * from users where email=?"
    const insertSql="insert into users(name,username,password,phonenumber,email,location) values(?,?,?,?,?,?) "
 db.query (checkSql,[email],async(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({success:false, message:"Database error"} );
        }
        if(result.length>0){
            return res.status(409).json({success:false, message:"User already exists!"} )
        }
        const hashedPassword=await bcrypt.hash(password,10)
 db.query (insertSql,[name, username, hashedPassword, phonenumber, email, location],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({success:false, message:"Error inserting user"} );
        }
        console.log("user registered successfully")
        return res.status(201).json({success:true, message:"user registered successfully!" } )
    })
    })
})


                //  login setup
    router.post("/login",async(req,res)=>{
   const {email,password}=req.body
   if(!email||!password){
    return res.status(400).json({ success:false, message:"All fields are rquired!" } )
   }
        const checkUser= "select * from users where email=?";
  db.query(checkUser,[email],async(err,result)=>{
            if (err){
                return res.status(500).json({success:false,message:"database error" } )
            }
            if(result.length===0){
        return res.status(404).json({success:false,message:"user not found"})
            }
        const user=result[0]
           const isMatch=await bcrypt.compare(password,user.password)
           if(!isMatch){
            return res.status(401).json({success:false,message:"incorrect password"  })
           }
     const token=jwt.sign(
        {id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"}
     ) 
     return res.status(200).json({success:true, message: "Login successful", 
        token: token , user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            location: user.location
          }
    });
        })


    })


module.exports=router