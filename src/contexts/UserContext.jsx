import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user information
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (token) {
          // Verify token and fetch user data
          const response = await axios.get("http://localhost:8000/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && response.data.user) {
            setUser(response.data.user); // Set the user if found
          } else {
            setUser(null); // Set user to null if no user found
          }
        } else {
          setUser(null); // Set user to null if no token is found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Set user to null if there's an error
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchUser();
  }, []); // Run once when the component mounts

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};
