const mysql=require("mysql2")
const db=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"tourism_landing"
    }
)
db.connect((err)=>{
    if(err){
        console.log("Database connection failed")
    }
    console.log("✅ Database connected successfully!")
})
module.exports=db