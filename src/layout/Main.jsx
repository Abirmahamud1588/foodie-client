import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import "../App.css";
import Footer from "../components/shared/Footer";
import { AuthContext } from "../Contexts/AuthProvider";
const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <div>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default Main;
