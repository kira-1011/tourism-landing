import { useLayoutEffect,useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import Destinations from "./Destinations";


function DestinationDetail() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { slug } = useParams();
const [destination,setDestination]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError]=useState(null)

useEffect(()=>{
  const fetchData=async()=>{
    try{
      const res = await fetch(`http://localhost:3000/api/destinations/destination/${slug}`)
      const data=await res.json()
      setDestination(data.data)
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }
  fetchData()
},[slug])
 

  
  

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // const tour = Tours.find((t) => t.slug === slug);

  if (!destination)
    return (
      <div className=" flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-background px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Destination not found
        </h1>
        <Link
          to={{ pathname: "/", hash: "destination" }}
          className="font-medium text-green-600 underline-offset-4 transition hover:text-green-700 hover:underline"
        >
          Back to destinations
        </Link>
      </div>
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Link
          to={{ pathname: "/", hash: "destination" }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 underline-offset-4 transition hover:text-green-700 hover:underline"
        >
          ← Back to destinations
        </Link>

        <h1 className="mt-6 text-balance text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {destination.name}
        </h1>

        {/* Top: image + intro */}
        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-10">
          <img
            className="aspect-[4/3] w-full shrink-0 rounded-xl object-cover shadow-md lg:aspect-auto lg:h-[min(520px,70vh)] lg:max-w-[52%] lg:flex-1"
            src={destination.image}
            alt={destination.name}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {destination.long_description}
            </p>
            <Link to={`/booking/${destination.id}`}>
            <button onClick={(e)=>{
              if(!user){
                e.preventDefault();
                alert("Please login first");
        
              }
            }} className="mt-6 w-32 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition duration-300">
  Book Now</button></Link>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default DestinationDetail;
