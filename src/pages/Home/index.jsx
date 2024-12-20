import Navbar from "../../components/Navbar/index";
import imgStudy from "../../assets/img/Group 117.png";
import imgChilstudy from "../../assets/img/Group 118.png";
import Ornamen1 from "../../assets/img/Ornament_11.png";
import Ornamen3 from "../../assets/img/Ornament 20.png";
import Ornament2 from "../../assets/img/Ornament 21.jpg";
import Ornamen4 from "../../assets/img/Group 119.png";
import Ornament5 from "../../assets/img/Group 120.png";
import CardTemplate from "../../components/Card/CardTemplate";
import Footer from "../../components/Footer";
import { useState } from "react";
import SignIn from "../../components/SignIn";
import SignUpEmail from "../../components/SignUp/SignUpEmail";

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div>
      <Navbar onSignInClick={() => setIsSignInOpen(true)} />
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpEmail
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <div className="h-screen relative">
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
              Bawa pengalaman kuis Anda ke level berikutnya dengan pertanyaan
              yang lebih seru dan penuh tantangan!
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
      <div className="relative">
        <div className="absolute top-0 right-8 bg-[#6D9773] w-48 h-8 rounded-md"></div>
        <div className="absolute top-12 right-8 bg-[#FFBA00] w-28 h-8 rounded-md"></div>
        <p className="text-center py-20 text-lg">
          Pilih Template quizz untuk mempelajari selengkapnya
        </p>
        <div className="flex justify-center">
          <CardTemplate />
        </div>
        <div className="flex justify-center">
          <button className="bg-[#0C382E] w-40 h-8 text-white my-20 rounded-md">
            Create Quiz
          </button>
        </div>
        <div className="absolute bottom-36 left-8 bg-[#FFBA00] w-28 h-8 rounded-md"></div>
        <div className="absolute bottom-24 left-8 bg-[#6D9773] w-48 h-8 rounded-md"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
