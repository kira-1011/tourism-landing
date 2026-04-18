const express=require("express")
const app=express()
app.use(express.json());
require("dotenv").config();
const db=require("./db/db")
const authRoutes = require("./routes/auth");
const destinationRoute = require("./routes/destination");
const path = require("path");
const bookRoutes=require("./routes/booking")
const wishlistRoutes=require("./routes/wishlist")

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "uploads")));

const cors = require("cors");
app.use(cors({
  origin:"http://localhost:5173"
}))
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/destinations",destinationRoute)
app.use("/api/bookings", bookRoutes)
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
  });
  const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
