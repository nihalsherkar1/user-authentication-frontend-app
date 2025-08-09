import "./App.css";

import Navbar from "./component/Navbar";

import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const token = useSelector((state) => state.login.token);

  return (
    <>
      {token && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
