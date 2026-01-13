import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvide = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [userData,setUserData]=useState(false)
  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // storing the user auth token
  const [usertoken, setUserToken] = useState(
    localStorage.getItem("usertoken") || ""
  );

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserProfileData=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{usertoken}})
      if(data){
        setUserData(data.data);
      }
     else  toast.error("Error to fetch user profile data")
      
    } catch (error) {
       console.log(error);
      toast.error(error.message);
    }
  }

  

  useEffect(() => {
    getAllDoctors();
   
  }, []);

  useEffect(()=>{
 if(usertoken)getUserProfileData();
  else setUserData(false)
  },[usertoken])

  const value = {
    doctors,
    currencySymbol,
    usertoken,
    setUserToken,
    getAllDoctors,
    backendUrl,
    userData,setUserData,
    getUserProfileData
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvide;
