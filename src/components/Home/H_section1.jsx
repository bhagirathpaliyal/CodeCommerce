import { Link } from "react-router-dom";
import { ReactTyped, Typed } from "react-typed";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
function H_section1() {
  return (
    <BackgroundBeamsWithCollision>
    <div id="section1" className="  bg-hero-image h-[100vh] w-full bg-cover  bg-no-repeat bg-bottom   flex flex-col justify-around items-center  text-black ">
     
      
      <div className="text-[20px] md:text-[24px] text-center">
      {<ReactTyped
      strings={[
        "Man's Wear",
        "Women's Wear",
        "Jewelery ",
        "& Electronic",
      ]}
      typeSpeed={60}
      backSpeed={80}
      // attr="placeholder"
      loop
   />}</div>
        <h2 className="text-[24px] md:text-[30px] ">
          Get Best Offers!
        </h2>


        <div className="flex flex-col items-center ">
        <div className="border-b-[2px] border-solid border-primary mt-[40px] rounded-[7px] ">
          <Link to="/AllProducts">
            <h1 className="text-[30px] md:text-[40px] text-black animate-bounce ">
              Shop Now!
            </h1>
          </Link>{" "}
        </div>
      </div>
       
    </div>
    </BackgroundBeamsWithCollision>
  );
}

export default H_section1;
