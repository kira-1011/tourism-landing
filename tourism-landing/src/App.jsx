import Nav from "./components/nav.jsx";
import Hero from "./components/Hero.jsx"
import booking from "./components/booking.jsx"
import Destinations from "./components/Destinations.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DestinationDetail from "./components/DestinationDetail.jsx";
import Gallery from "./components/Gallery.jsx"
import Signup from "./components/signUp.jsx"
import Login from "./components/login.jsx"
import Booking from "./components/booking.jsx"
import Dashboard from "./components/dashboard.jsx";
import Contact from "./components/contact.jsx"
function App() {
  return (
    <>

 
     <Routes>
      <Route path="/" element={
        <>
       
             <Nav/>
             <Hero/>
            <Destinations/>
            <Gallery/>
            <Contact/>
           
      </>} >
    </Route>
      <Route path="/destination/:slug" element={<DestinationDetail />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/booking/:id" element={<Booking/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>


    </>
    
         
    
  );
}
export default App;
