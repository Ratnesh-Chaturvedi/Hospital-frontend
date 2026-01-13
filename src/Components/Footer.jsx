import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router'

function Footer() {
    const navigate=useNavigate();
  return (
   <div className='md:mx-10' >
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
   {/* left-section */}
    <div className='' >
        <img className='mb-5 w-40' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>We make it easy to find the right doctor, book appointments online, and get basic health guidance — all in one simple and secure platform.</p>
    </div>
    {/* center section */}
   <div>
<p className='font-semibold text-xl'>COMPANY</p>
<ul className='mt-5 font-normal cursor-pointer'>
    <li onClick={()=>{navigate('/');scrollTo(0,0)}}>Home</li>
    <li onClick={()=>{navigate('/about') ; scrollTo(0,0)}}>About us</li>
    <li>More About US</li>
    <li>Privacy policy</li>
</ul>
   </div>
        
        {/* right-section */}
      
   <div>
<p className='font-semibold text-xl' >GET IN TOUCH</p>
<ul className='mt-5 font-normal'>
    <li>+0-000-000-000</li>
    <li>chaturvediratnesh@gmail.com</li>
</ul>
    
    </div>
    </div>
          
    
        {/* copywright */}
        <div className= ' flex items-center justify-center mb-2'><hr /><p className='  text-gray-600'>Copyright 2026 @Ratnesh.Dev - All Right Reserved.</p>
        </div>
   </div>
  )
}

export default Footer