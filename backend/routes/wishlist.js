const express=require("express")
const db=require("../db/db")
const router=express.Router()

router.post("/wishlist",(req,res)=>{
    const {user_id, destination_id}=req.body
    const checkSql="select * from wishlist where user_id=? AND destination_id=?"
    const insertSql="insert into wishlist (user_id,destination_id)values(?,?)"
    const removeSql="delete from wishlist where user_id=? AND destination_id=?"
    db.query(checkSql,[user_id,destination_id],(err,result)=>{
        if(err){
            return res.status(500).json({success:false ,message:"server error" } )
        }
        if(result.length===0){ 
            db.query(insertSql,[user_id,destination_id],(err,result)=>{
                if(err){
                    return res.status(500).json({success:false, message:"Database error"})
                }
                return res.json({success:true,message:"add to wishlist ❤️"})
            })
        } else{
 db.query(removeSql,[user_id,destination_id],(err,result)=>{
    if(err){
        return res.status(500).json({success:false, message:"daya base error"})
    }
    return res.json({success:true,message:"remove from wishlist 🤍"})

 })
        }
    })
 
})
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
  
    const sql = `
    SELECT 
      d.id,
      d.name,
      d.image
    FROM wishlist w
    JOIN destination d ON w.destination_id = d.id
    WHERE w.user_id = ?
  `;
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }
  
      return res.json({
        success: true,
        data: result
      });
    });
  });
module.exports=router