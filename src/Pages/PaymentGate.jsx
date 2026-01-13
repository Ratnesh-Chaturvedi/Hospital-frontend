import React, { useContext, useState } from 'react'
import {toast} from "react-toastify"
import { useNavigate } from "react-router";
import axios from 'axios';
import { AppContext } from '../Context/Context.jsx';
import { useParams } from "react-router-dom";

const PaymentGate = () => {
    const [id,setId]=useState('');
    const [pin,setPin]=useState('')
    const {appointmentId}=useParams()
    
    const {backendUrl,usertoken}=useContext(AppContext)
    const navigate=useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!id || !pin ){
        toast.error("Fill the information")
     return;   
    }
try {
    const {data}= await axios.patch(backendUrl+'/api/user/payment',{appointmentId},{headers:{usertoken}}) 
    if(data.success){
        toast.success("Payment Successfull");
        navigate("/my-appointments");
        setId('');
        setPin('')
    }
    else {
        toast.error(data.message)
    }
} catch (error) {
    console.log(error)
    toast.error("Payment Failed" );
}
  };



  return (
    <form >
      <div className="h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="w-80 rounded-xl bg-white shadow-lg p-6">
          
          <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
            UPI Payment
          </h2>

          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="cardNum" className="text-sm font-medium text-gray-700">
                UPI ID
              </label>
              <input value={id} onChange={(e)=>setId(e.target.value)}
                className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="cardNum"
                placeholder="example@upi"
              />
            </div>

            <div>
              <label htmlFor="pin" className="text-sm font-medium text-gray-700">
                PIN
              </label>
              <input value={pin} onChange={(e)=>setPin(e.target.value)}
                className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                id="pin"
                placeholder="••••"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button 
            onClick={onSubmitHandler}
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition"
            >

              Pay Now
            </button>

            <button
              type="button"
              onClick={()=>navigate('/my-appointments')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default PaymentGate;
