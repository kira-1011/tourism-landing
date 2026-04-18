const express=require("express")
const db=require("../db/db")
const router=express.Router()


router.post("/booking",(req,res)=>{
    const { destination_id,user_id,name,email,phone,people,travel_date,message}=req.body;
    const insertSql="insert into bookings(destination_id,user_id,name,email,phone,people,travel_date,message) values(?,?,?,?,?,?,?,?)"
db.query(insertSql,[ destination_id,user_id,name,email,phone,people,travel_date,message,],(err,result)=>{
    if(err){
        return res.status(500).json({success:false,message:"booking failed" } )
    }
    return res.json({success:true,message:"user booked succusfully" , bookingId: result.insertId} )
})
})
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
  
    const sql = `
      SELECT   b.id,b.destination_id,b.user_id,b.name,b.email,b.phone,b.people,b.travel_date,b.message,b.status,
        b.created_at,d.name AS destination_name,
d.image
      FROM bookings b
      JOIN destination d ON b.destination_id = d.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `;
  
    db.query(sql, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "DB error" });
      }
  
      res.json({
        success: true,
        data: result
      });
    });
  });
module.exports=router