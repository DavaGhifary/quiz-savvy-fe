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
import { useEffect, useState } from "react";
import SignIn from "../../components/SignIn";
import SignUpEmail from "../../components/SignUp/SignUpEmail";
import ForgotPassword from "../../components/ForgotPasswordPage/ForgotPassword";
import ChangedPassword from "../../components/ForgotPasswordPage/ChangedPassword";

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [redirectToForgot, setRedirectToForgot] = useState(false);
  const [isChangedPasswordOpen, setIsChangedPasswordOpen] = useState(false);

  // Efek untuk menangani perpindahan modal ke ForgotPassword
  useEffect(() => {
    if (redirectToForgot) {
      setIsSignInOpen(false);
      setIsForgotPasswordOpen(true);
      setRedirectToForgot(false); // Reset setelah perubahan modal
    }
  }, [redirectToForgot]);
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
        onSwitchToForgotPassword={() => {
          setIsSignInOpen(false);
          setIsForgotPasswordOpen(true);
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
      <ForgotPassword isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSwitchToSignIn={() => {
          setIsForgotPasswordOpen(false);
          setIsSignInOpen(true); // Tampilkan kembali modal SignIn
        }}
      />

      <ChangedPassword isOpen={isChangedPasswordOpen}/>
      <div className="h-screen relative">
        <img src={Ornamen4} alt="" className="absolute right-0 top-[5rem]" />
        <img
          src={Ornament2}
          alt=""
          className="absolute top-[7rem] sm:top-[9rem] sm:left-[4rem] md:top-[9rem] md:left-[2rem] lg:top-[12rem] lg:left-[5rem] xl:top-[12rem] xl:left-[5rem]"
        />
        <img
          src={imgChilstudy}
          alt=""
          className="absolute top-[9rem] left-[2rem] sm:top-[10rem] sm:left-[5rem] md:top-[11rem] md:left-[3rem] lg:top-[13rem] lg:left-[7rem] xl:top-[13rem] xl:left-[7rem]"
        />
        <img
          src={Ornamen3}
          alt=""
          className="absolute top-[31rem] sm:top-[17rem] sm:left-0 md:top-[20rem] md:left-[2rem] lg:top-[21rem] lg:left-[6rem] xl:top-[19.5rem] xl:left-[10rem]"
        />
        <div className="flex justify-center items-center h-screen">
          <div className="mx-auto sm:w-[27rem] md:w-[30rem] lg:w-[40rem] xl:w-[40rem]">
            <p className="text-[2.5rem] sm:text-[3rem] md:text-[3rem] lg:text-[4rem] xl:text-[4rem] text-center">
              <span className="text-[#767676]">Make Your Quiz Even More</span>{" "}
              <span className="text-[#6D9773]">Exciting</span>{" "}
              <span className="text-[#767676]">and</span>{" "}
              <span className="text-yellow-400">Challenging!</span>
            </p>
            <p className="text-center px-8 md:text-sm lg:text-sm xl:text-sm text-[#C3C3C3]">
              Bawa pengalaman kuis Anda ke level berikutnya dengan pertanyaan
              yang lebih seru dan penuh tantangan!
            </p>
          </div>
        </div>
        <img
          src={Ornamen1}
          alt=""
          className="absolute max-sm:hidden sm:top-[28rem] sm:right-0 md:top-[22rem] md:right-0 lg:top-[22rem] lg:right-[2rem] xl:top-[16rem] xl:right-[5.5rem]"
        />
        <img
          src={imgStudy}
          alt=""
          className="absolute max-sm:hidden sm:top-[29.5rem] sm:right-6 md:top-[26rem] md:right-6 lg:top-[28rem] lg:right-[3rem] xl:top-[20rem] xl:right-[8rem]"
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
        <div className="flex justify-center max-sm:pt-6">
          <button className="bg-[#0C382E] w-40 h-8 text-white my-20 rounded-md">
            Create Quiz
          </button>
        </div>
        <div className="absolute max-sm:bottom-44 bottom-36 left-8 bg-[#FFBA00] w-28 h-8 rounded-md"></div>
        <div className="absolute max-sm:bottom-32 bottom-24 left-8 bg-[#6D9773] w-48 h-8 rounded-md"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
