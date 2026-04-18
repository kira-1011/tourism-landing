
const express=require("express")
const db=require("../db/db")
const router=express.Router()

router.get("/destination",(req,res)=>{
    const sql="select * from destination"
    db.query(sql,(err,result)=>{
        if(err){
             console.log(err)
              return res.status(500).json({success:false, message:"database error"})
             }
return res.json({success:true, data:result})
    })
})

router.get("/destination/:slug",(req,res)=>{
    const { slug } = req.params;
    const checkSql="select * from destination where slug=?"
    db.query(checkSql,[slug] ,(err,result)=>{
        if(err){
            return res.status(500).json({success:false, message:"failed to fetch data" } )
        }
        return res.json({success:true,data:result[0] } )
    })
})
module.exports=router