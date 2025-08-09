import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import AdminTabs from "./Admin/AdminTabs";
import { tabs } from "./Admin/Tabs";
export default function Dashboard() {
  const navigate = useNavigate();
  const [setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Profile");
  const token = sessionStorage.getItem("token");
  const OAuthUser = sessionStorage.getItem("user");
  const normalUser = sessionStorage.getItem("normalUser");

  const { role } = useSelector((state) => state.login);

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  // Fetch user data from token-based login or OAuth
  useEffect(() => {
    if (OAuthUser) {
      // If OAuth login
      const parsedUser = JSON.parse(OAuthUser);
      console.log(parsedUser.email);
      setEmail(parsedUser.email);
    } else if (normalUser) {
      setEmail(normalUser);
    } else if (token) {
      // If token-based login
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
          setUsername(response.data.username);
          setEmail(response.data.email);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [OAuthUser, token]);

  return (
    <div>
      {role === "ROLE_USER" && <h3>Dashboard</h3>}

      {role === "ROLE_ADMIN" && (
        <AdminTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}
