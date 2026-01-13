import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "./Context/Context.jsx";
import { assets } from "./assets/assets_frontend/assets.js";
import RelatedDoctor from "./Components/RelatedDoctor.jsx";
import { toast } from "react-toastify";
import axios from "axios";
// import { data } from 'autoprefixer'
const daysofweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,usertoken,getAllDoctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [Slotindex, setSlotindex] = useState(0);
  const [Slottime, setSlottime] = useState('');

  const fetchInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const navigate=useNavigate();


  const getAvailableSlot = async () => {
    setDocSlot([]);
    // getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlot = [];
      while (currentDate < endTime) {
        let formattedtime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const date=currentDate.getDate();
        const month=currentDate.getMonth()+1;
        const year=currentDate.getFullYear();
        const slotDate=date+"_"+month+"_"+year;
        const slotTime=formattedtime
        const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ?false:true;
        if(isSlotAvailable){ 
          // add slots to array
          timeSlot.push({
            datetime: new Date(currentDate),
            time: formattedtime,
          });
        }
        // incremant time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlot]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);

  useEffect(() => {
    // console.log(docSlot);
  }, [docSlot]);


  // book appointments
  const bookAppointment=async()=>{
    if(!usertoken){
      toast.warn("Login to Book appointments")
     return  navigate('/login')
    }

    try {
      const date=docSlot[Slotindex][0].datetime
      const slotTime=Slottime;
      // console.log(slotTime)
     const day=date.getDate();
     const month=date.getMonth()+1;
     const year=date.getFullYear();
     const slotDate=day+"_"+month+"_"+year
      // console.log(slotDate)
    
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{usertoken}})
    
      if(!data){
         toast.error("Data is unvailable")
      }
      
      if(data.success){
        toast.success("Appointment booked successfully")
        getAllDoctors();
        navigate('/my-appointments')
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }





  return (
    docInfo && (
      <div className="mt-8">
        {/* Doctors details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="w-full sm:max-w-72 rounded-lg bg-primary"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className=" flex-1 border-2 border-gray-500 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 text-black">
            {/* doc information like nmae degree */}
            <p className="flex items-center gap-2 text-2xl  font-medium text-gray-900 ">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="icon" />{" "}
            </p>

            <div className="flex gap-2 text-sm items-center mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs text-gray-900 rounded-full ">
                {docInfo.experience}
              </button>
            </div>
            {/* doctor about */}
            <div>
              <p className="flex gap-4 items-center text-sm font-medium mt-3 text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-900 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-900 font-medium mt-4 ">
              Appointment fee:{currencySymbol}
              <span className="text-gray-600">{docInfo.fee}</span>
            </p>
            <div></div>
          </div>
        </div>
        {/* booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slot</p>
          <div className="flex gap-3 w-full items-center overflow-x-scroll mt-4">
            {docSlot.length &&
              docSlot.map((item, index) => (
                <div onClick={()=>setSlotindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${Slotindex===index ?`bg-primary text-white`:'border border-gray-400'}`} key={index}>
                  <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex overflow-x-scroll w-full items-center gap-3  mt-4">
            {docSlot.length && docSlot[Slotindex].map((item,index)=>(
              <p onClick={()=>setSlottime(item.time)
              } className={`text-sm flex-shrink-0 px-5 py-2 rounded-full cursor-pointer font-light ${item.time===Slottime?'bg-primary text-white': ' border  text-gray-400 border-gray-400'}`} key={index}>{item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className="rounded-full font-light bg-primary text-white text-sm py-3 px-3 mt-4">Book an Appointment</button>
        </div>
        {/* Releted Doctors */}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
}

export default Appointment;
