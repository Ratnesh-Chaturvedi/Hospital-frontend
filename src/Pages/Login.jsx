import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/Context.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [state, setState] = useState("SignUp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const {usertoken,setUserToken,backendUrl}=useContext(AppContext)
  const navigate=useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(state==="SignUp"){
        const {data}=await axios.post(backendUrl+"/api/user/register",{email,password,name})
        if(data.success){
          //here the data is the token
          localStorage.setItem("usertoken",data.data)
          setUserToken(data.data)
          toast.success("User account created.  ")
          
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        const {data}=await axios.post(backendUrl+"/api/user/login",{email,password})
        if(data.success){
          localStorage.setItem("usertoken",data.data)
          setUserToken(data.data)
          toast.success("Logged In successfully")
        }
        else {
           toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

useEffect(()=>{
  if(usertoken)
navigate("/")
},[usertoken])

  return (
    <form onSubmit={onSubmitHandler}
     className="min-h-[80vh] flex items-center mt-4 ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-2 rounded border-gray-400 shadow-black">
        <p className="text-2xl font-semibold">
          {state === "SignUp" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "SignUp" ? "signup" : "login"}
          to book appointment{" "}
        </p>
        {state === "SignUp" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button  type="submit"
        className="w-full mt-1 py-2 text-base bg-primary text-white rounded">
          {state === "SignUp" ? "Create Account " : "Login "}
        </button>
        {state === "SignUp" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account ?{" "}
            <span
              onClick={() => setState("SignUp")}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
