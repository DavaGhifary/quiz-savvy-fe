import Navbar from "./components/Navbar";
import imgStudy from "../src/assets/img/Group 117.png"
import imgChilstudy from "../src/assets/img/Group 118.png"

function App() {
  return (
    <div className="h-screen relative">
      <Navbar />
      <img src={imgChilstudy} alt="" className="absolute top-[15rem] left-[10rem]" />
      <div className="flex justify-center mt-36">
        <p className="text-[3.8rem] w-[40rem] text-center">Make Your Quiz Even More <span className="text-[#6D9773]">Exciting</span> and <span className="text-yellow-400">Challenging!</span></p>
      </div>
      <img src={imgStudy} alt="" className="absolute top-[20rem] right-[8rem]" />
    </div>
  );
}

export default App;
