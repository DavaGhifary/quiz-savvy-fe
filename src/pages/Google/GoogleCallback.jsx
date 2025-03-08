import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../utils/session";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        setSession("authToken", token, 24);
        setSession("userDetails", parsedUser, 24);

        navigate("/dashboard");
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      }
    } else {
      console.error("Gagal Google: Token atau User tidak ditemukan.");
      navigate("/");
    }
  }, [navigate]);

  return <p>Processing login...</p>;
};

export default GoogleCallback;
