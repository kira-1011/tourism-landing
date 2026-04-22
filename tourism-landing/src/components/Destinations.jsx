import { useEffect, useRef,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Heart } from "lucide-react";


function Destinations() {
  const sectionRef = useRef(null);
  const { hash } = useLocation();
 const [destinations,setDestinations]=useState([])
 const [loading,setLoading]=useState(true)
 const [error,setError]=useState(null)
 const [liked, setLiked] = useState({});
 const handleFavourite=async(id)=>{
       setLiked(prev=>({...prev,[id]:!prev[id]}))
       const token = localStorage.getItem("token");
       const user = JSON.parse(localStorage.getItem("user")) || {};
       try {
        const res = await fetch("http://localhost:3000/api/wishlist/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ destination_id:id , user_id: user.id,}),
        });
    
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    
 }
 useEffect(()=>{
  const fetchData=async()=>{
  try{ setLoading(true)
    const res = await fetch("http://localhost:3000/api/destinations/destination");
      const data=await res.json()
      console.log(data)
      setDestinations(data?.data || []);
  }catch(err){
   setError(err.message)
  }finally{
    setLoading(false)
  }
  
  }
   fetchData();
 },[])
  useEffect(() => {
    if (hash === "#destination" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <section
      ref={sectionRef}
      
      className="scroll-mt-24 flex flex-col justify-center bg-slate-800 py-16"
      id="destination"
    >
      <h1 className="mt-4 text-center text-white text-5xl font-extrabold mb-12">
        Our Main Destinations
      </h1>

      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="!bg-amber-50 m-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="p-0">
              <img
                className="h-52 w-full object-cover"
                src={destination.image}
                alt={destination.name}
              />
            </CardHeader>

            <CardContent className="px-4 py-6 text-center">
              <h2 className="text-xl font-semibold mb-2">
                {destination.name}
              </h2>
              <p className="font-bold text-sm text-gray-700">
                {destination.short_description}
              </p>
              <div onClick={() => handleFavourite(destination.id)} className="flex justify-center mt-2 cursor-pointer">
   <Heart fill={liked[destination.id] ? "red" : "none"} color="red"/>
</div>
              
            </CardContent>

            <CardFooter className="!bg-amber-50/80">
              <Link
                to={`/destination/${destination.slug}`}
                className="w-full !bg-amber-50/80"
              >
                <Button className="w-full bg-green-600 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition">
                  View Detail
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Destinations;