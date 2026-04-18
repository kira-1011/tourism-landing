import profile from  "../assets/bg.jpg"
function Hero(){

    return(
        <>
         <section  style={{
  background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${profile}) center/cover`,
}} className=" cursor-default flex flex-col gap-13 items-center justify-center bg-cover bg-no-repeat h-[100vh]" id="home">
          
          <div className="flex  flex-col gap-2">
            <h1 className="  text-center items-center text-4xl md:text-6xl font-bold text-white"> Don't just travel</h1>
            <p className=" text-[#FF6F00] text-center items-center text-4xl md:text-6xl font-bold">Discover Ethiopia</p>
          </div>

            <div className="flex gap-10 justify-center group ">
                <button className="text-white px-6 py-3 rounded-xl  bg-[#008000] group-hover:bg-white/40 transition-colors duration-500 ">Explore </button>
                <button className=" text-white px-6 py-3 rounded-xl  bg-white/40 group-hover:bg-[#008000]  transition-colors duration-500">Book Now</button>
            </div>
        </section>
        </>
         
     
    )
}
export default Hero;