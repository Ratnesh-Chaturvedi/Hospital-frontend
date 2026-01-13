import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Context";

function TopDoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="  flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium mb-4">Top Doctors to Book</h1>
      <p className="tex-sm w-1/3 text-center">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-8">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500  "
          >
            <img src={item.image} className="bg-blue-50" alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className={`w-2 h-2 rounded-full ${item.available?"bg-green-500":"bg-red-500"}`}></p>
                <p className='text-black'>{item.available ?"Available":"Not Available"}</p>
              </div>
              <div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-800 text-sm">{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>navigate(`/doctors`)}
        className=" 
        mt-5 px-4 py-2 rounded-full  bg-gray-300 hover:scale-105 transition-all duration-200 "
      >
        more..
      </button>
    </div>
  );
}

export default TopDoctors;
