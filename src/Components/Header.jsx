
import { assets } from '../assets/assets_frontend/assets'

function Header() {
  return (
    <div className='flex md:flex-row   flex-wrap rounded-md items-center justify-between px-5 md:px-10 lg-px-20  bg-primary mt-10  '>
        {/* //left side */}
        <div className='md:w-1/2  flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
        <p className='text-3xl md:text-4xl capitalize text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>
            Book Appointmnet <br /> With trusted Doctors
        </p>
        <div className='flex md:flex-row flex-col  items-center  gap-2 text-md '>
            <img className='align-center' src={assets.group_profiles} alt="group-profiles" />
            <p className='text-white text-sm'> Simply browse throug our extensive list of trusted doctors,<br /> schedule your appointment</p>
        </div>
        <a className='flex items-center  gap-1  h-auto bg-white font-sm m-auto md:m-0 hover:scale-105 py-2 px-2 text-center rounded-full transition-all duration .3s ' href="#speciality">
            Book Appointment <img  className='w-3' src={assets.arrow_icon} alt="" />
        </a>

        </div>

        {/* // right-side */}
        <div className='w-1/2 relative'>
            <img className= 'md:w-full   rounded-lg ' src={assets.header_img} alt="#" />
        </div>
    </div>
  )
}

export default Header