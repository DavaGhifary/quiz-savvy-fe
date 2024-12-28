import Logo from "../../assets/img/Logo.png";

const Footer = () => {
  return (
    <div className="border-t-2 border-[#C3C3C3] flex justify-between mx-10">
      <div className="flex items-center">
        <img src={Logo} width={60} alt="" />
        <p className="font-semibold text-lg">Savvy</p>
      </div>
      <div className="flex items-center">
        <p>Copyright © 2024 Savvy</p>
      </div>
    </div>
  );
};

export default Footer;
