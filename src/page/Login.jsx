import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { loginUser } from "../features/login/loginAction";
import { setAuthenticated } from "../features/login/loginSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.login);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser({ email, password }));

      console.log("Login response:", res);

      if (res.meta.requestStatus === "fulfilled") {
        console.log(res.payload);
        sessionStorage.setItem("token", res.payload.token.token);
        sessionStorage.setItem("normalUser", res.payload.token.email);
        sessionStorage.setItem("role", res.payload.token.role);
        dispatch(setAuthenticated(true));

        alert("Login Successful!");
        navigate("/dashboard"); // or your protected route
      } else {
        alert(res.payload.message || "Login failed");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const oauthLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Normal login */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full px-4 py-2 border-gray-500    border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border  border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-900 cursor-pointer  text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">
          or continue with
        </div>

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => oauthLogin("google")}
            className="flex items-center cursor-pointer   justify-center gap-2 bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>

          <button
            onClick={() => oauthLogin("github")}
            className="flex items-center justify-center cursor-pointer  gap-2 bg-gray-500 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-5 h-5 "
            />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
