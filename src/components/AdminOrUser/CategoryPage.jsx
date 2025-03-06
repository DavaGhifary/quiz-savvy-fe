import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../../utils/session";
import TabelCategory from "../CategoryList/TabelCategory";
import Category from "../../pages/Dashboard/Category";

const CategoryPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = getSession("userDetails");
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); 
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    return <Navigate to="/" replace />; 
  }

  return user.roles_id === 1 ? <TabelCategory /> : <Category />;
};

export default CategoryPage;
