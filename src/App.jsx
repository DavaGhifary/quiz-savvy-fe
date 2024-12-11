import Navbar from "./components/Navbar";
import imgStudy from "../src/assets/img/Group 117.png";
import imgChilstudy from "../src/assets/img/Group 118.png";
import Ornamen1 from "../src/assets/img/Ornament_11.png";
import Ornamen3 from "../src/assets/img/Ornament 20.png";
import Ornament2 from "../src/assets/img/Ornament 21.jpg";
import Ornamen4 from "../src/assets/img/Group 119.png";
import Ornament5 from "../src/assets/img/Group 120.png"

function App() {
  return (
    <div>
    <div className="h-screen relative">
      <Navbar />
      <img src={Ornamen4} alt="" className="absolute right-0 top-[5rem]" />
      <img
        src={Ornament2}
        alt=""
        className="absolute top-[12rem] left-[5rem]"
      />
      <img
        src={imgChilstudy}
        alt=""
        className="absolute top-[13rem] left-[7rem]"
      />
      <img
        src={Ornamen3}
        alt=""
        className="absolute top-[19.5rem] left-[10rem]"
      />
      <div className="flex justify-center items-center h-screen">
        <div className="mx-auto w-[40rem]">
          <p className="text-[4rem] text-center">
            <span className="text-[#767676]">Make Your Quiz Even More</span>{" "}
            <span className="text-[#6D9773]">Exciting</span>{" "}
            <span className="text-[#767676]">and</span>{" "}
            <span className="text-yellow-400">Challenging!</span>
          </p>
          <p className="text-center px-8 text-sm text-[#C3C3C3]">
            Bawa pengalaman kuis Anda ke level berikutnya dengan pertanyaan yang
            lebih seru dan penuh tantangan!
          </p>
        </div>
      </div>
      <img
        src={Ornamen1}
        alt=""
        className="absolute top-[16rem] right-[5.5rem]"
      />
      <img
        src={imgStudy}
        alt=""
        className="absolute top-[20rem] right-[8rem]"
      />
      <img src={Ornament5} alt="" className="absolute bottom-10" />
    </div>
    <div>
      <p className="text-center mt-10">Pilih Template quizz untuk mempelajari selengkapnya</p>
    </div>
    </div>
  );
}

export default App;
