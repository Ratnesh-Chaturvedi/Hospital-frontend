import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/Context";
function Navbar() {
  const navigate = useNavigate();
  const [showmenu, setshowmenu] = useState(false);
  
  const {userData,backendUrl,usertoken,setUserToken}=useContext(AppContext)

  const logOut=()=>{
    localStorage.removeItem("usertoken")
    setUserToken(false);
  }


  return (
    <div className="flex items-center justify-between  w-full  mt-3  ">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex items-center justify-between gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center  gap-4">
        {usertoken ? (
          <div className="flex items-center cursor-pointer gap-2 object-cover group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className=" hidden absolute top-9 right-0 text-gray-600 z-20 group-hover:block">
              <div className="min-w-40 bg-stone-200 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("my-profile");
                  }}
                  className="  hover:text-black cursor-pointer font-medium text-sm "
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("my-appointments");
                  }}
                  className=" hover:text-black cursor-pointer font-medium text-sm"
                >
                  My Appointmnet
                </p>
                <p
                  onClick={logOut}
                  className=" hover:text-black cursor-pointer font-medium text-sm"
                >
                  LogOut
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary rounded-full  ml-10 p-2 text-white md:block hidden font-semibold "
          >
            Create Account
          </button>
        )}

        <img
          className="w-6 md:hidden "
          onClick={() => setshowmenu(true)}
          src={assets.menu_icon}
        />
        {/* mobile menu */}
        <div className={` ${showmenu?"fixed w-full ":"h-0 w-0"} md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36 " src={assets.logo} alt="" />
            <img className="w-8"
              onClick={() => setshowmenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul  className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink   onClick={()=>setshowmenu(false)} to={"/"}> <p className='rounded px-2 inline-block py-3'>Home</p></NavLink>
            <NavLink  onClick={()=>setshowmenu(false)} to={"/doctors"}> <p className='rounded px-2 inline-block py-3'>All Doctors</p></NavLink>
            <NavLink  onClick={()=>setshowmenu(false)} to={"/about"}> <p className='rounded px-2 inline-block py-3'>About</p></NavLink>
            <NavLink  onClick={()=>setshowmenu(false)} to={"/contact"}>
              <p className='rounded px-2 inline-block py-2'>Contact</p>
            </NavLink>
          </ul>
        </div>
      </div> 
    </div>
  );
}

export default Navbar;
