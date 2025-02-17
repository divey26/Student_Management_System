import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userNo = localStorage.getItem("userNo");
        if (!userNo) return;

        let response;
        if (userNo.startsWith("S")) {
          response = await axios.get(`http://localhost:5000/api/std/det/${userNo}`);
        } else {
          response = await axios.get(`http://localhost:5000/api/teachers/${userNo}`);
        }

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
