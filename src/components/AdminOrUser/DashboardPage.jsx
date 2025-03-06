import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardAdmin from "../../pages/Dashboard/DashboardAdmin";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { getSession } from "../../utils/session";

const DashboardPage = () => {
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

  return user.roles_id === 1 ? <DashboardAdmin /> : <Dashboard />;
};

export default DashboardPage;
