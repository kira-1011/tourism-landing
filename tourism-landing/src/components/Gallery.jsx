import G1 from "../assets/G1.jpg"
import G2 from "../assets/G2.jpg"
import G3 from "../assets/G3.jpg"
import G4 from "../assets/G4.jpg"
import G5 from "../assets/G5.jpg"
import G6 from "../assets/G6.jpg"
import G7 from "../assets/G7.jpg"
import G8 from "../assets/G8.jpg"
import G9 from "../assets/G9.jpg"
import G10 from "../assets/G10.jpg"
import G11 from "../assets/G11.jpg"
import G12 from "../assets/G12.jpg"
import G13 from "../assets/G13.jpg"
import G14 from "../assets/G14.jpg"
import G15 from "../assets/G15.jpg"
import G16 from "../assets/G16.jpg"
function Gallery(){
const image=[
    { id:1 ,src: G1 },
    { id:2 ,src: G2 },
    { id:3 ,src:G3 },
    { id:4 ,src:G4 },
    { id:5 ,src:G5 },
    { id:6 ,src:G6 },
    { id:7 ,src:G7 },
    { id:8 ,src:G8 },
    { id:9 ,src:G9 },
    { id:10 ,src:G10 },
    { id:11 ,src:G11 },
    { id:12 ,src:G12 },
    { id:13 ,src:G13 },
    { id:14 ,src:G14 },
    { id:15 ,src:G15 },
    { id:16 ,src:G16 },
 ]

    return(
        <>
        <section id="gallery">
        <h1 className="text-center  mt-5 text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">
            Explore Ethiopia
        </h1>

 <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
{
    image.map(pic=> 
        <div 
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out m-2"
            key={pic.id}
        >
        <img 
            className="h-60 w-full object-cover" 
            src={pic.src}  
        />
        {/* <p className="font-semibold text-center py-3 text-gray-700 text-lg">
            Ethiopia
        </p> */}
    </div>)
}

        </div>
        </section>
        </>
 )
}

export default Gallery