import React, { useContext } from "react";
import logo from "/logo.png";
import { BiPhoneCall } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import Modals from "./Modals";
import { AuthContext } from "../../Contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import usecart from "../../hooks/usecart";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = usecart();

  console.log(user);
  console.log(cart);

  const navitem = (
    <>
      <li>
        <a href="/"> Home</a>
      </li>
      <li>
        <a href="/menu">Menu</a>
      </li>

      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a> Table Booking</a>
            </li>
            <li>
              <a> Online order</a>
            </li>
            <li>
              <a> Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2xl container mx-auto ">
      <div className="navbar xl:px-24 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navitem}
            </ul>
          </div>
          <a href="/">
            <img src={logo} />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-xl">
            {navitem}
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle hidden lg:flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* {cart iten} */}
          <Link to="/cart-page">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 hidden lg:flex items-center "
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </div>
          </Link>

          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modals />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
