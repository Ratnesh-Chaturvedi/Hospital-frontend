import React, { useContext } from 'react'
import { AppContext } from '../Context/Context.jsx'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function MyAppointment() {
const navigate=useNavigate();

   const {backendUrl,usertoken,getAllDoctors}=useContext(AppContext)
   
   const [appointmentData,setAppointmentData]=useState(false);
    const month=["","Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

    const formatDate=(dateStr)=>{
        const dateArray=dateStr.split("_") ;
        return dateArray[0]+" "+month[Number(dateArray[1])]+" "+dateArray[2];
    }

const getMyAppointment=async()=>{
    try {
        const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{usertoken}})
        if(data.success){
            setAppointmentData(data.data.reverse())
            // toast.success("All appointment fetched successfully")
        }
        else {
            toast.error("Error in Appointment data")
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}



const cancelAppointment=async(appointmentId)=>{
    try {

        const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{usertoken}})

        if(data.success){
            toast.success("Appointment chancelled")
            getMyAppointment();
            
        }else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


useEffect(()=>{
    if(usertoken)
getMyAppointment();
    else toast.error("Error")
},[usertoken])

  return appointmentData &&  (
      <div className='mt-4'>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
     <div>
{
    appointmentData.map((item,index)=>(
   <div className='hover:bg-blue-300 p-2 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
    <div>
        <img className='w-32 bg-indigo-50 ' src={item.docData.image}  />
    </div>
    <div className='flex-1 text-sm text-zinc-700'>
        <p className='text-neutral-800 font-sm'>{item.docData.name}</p>
        <p>{item.docData.speciality}</p>
        <p className='text-zinc-800 font-medium mt-1'>Address</p>
        <p className='text-xs'>{item.userData.address.line1 || ""}</p>
        <p  className='text-xs'>{item.userData.address.line2 || ""}</p>
        <p className='text-sm mt-1'><span className='text-sm text-neutral-800 font-medium '>Date & Time : </span> {formatDate(item.slotDate)} | {item.slotTime} </p>
    </div>
    <div className='flex flex-col gap-2 justify-end'>
       {!item.cancelled &&  !item.isCompleted &&  <button onClick={()=>navigate(`/payment/${item._id}`)}  className='text-sm border sm:min-w-48 rounded hover:text-white  hover:bg-primary py-2'>Pay Online</button> }
       {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm border sm:min-w-48 rounded hover:text-white hover:bg-red-600 py-2'>Cancel Appointment</button> }
       {item.cancelled && <button className='sm:min-w-48 py-2 text-white bg-red-500 rounded  px-3 '>Appointment cancelled</button>}
       {!item.cancelled && item.isCompleted && <button className='sm:min-w-48 py-2 text-white bg-green-500 rounded  px-3 '>Appointment completed</button> }
       
    </div>
   </div>
    ))
}
        </div>
    </div>
  )
}

export default MyAppointment