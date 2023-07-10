import React, { useState } from 'react'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';


function Inputs({setQuery,units,setUnits}) {
  const [city,setCity] = useState("");
  const handleSearchClick=()=>{
    if(city!=='')
    setQuery({q: city})
  };
  const handlelocationclick=()=>{
    if(navigator.geolocation)
    {
      toast.info('Fetching users location');
      navigator.geolocation.getCurrentPosition((position)=>{
        toast.success('Location fetched');
        let lat =position.coords.latitude;
        let lon =position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  const handleunitchange=(e)=>{
const selectedunits=e.currentTarget.name;
if(units!==selectedunits)
setUnits(selectedunits);
  };
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center spaxe-x-4'>
            <input  value={city}
       onChange={(e)=>setCity(e.currentTarget.value)}
            type='text' placeholder='Search for city...' className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'>
       </input>
       
       <UilSearch size={25} className="text-white mx-1 cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick}/>
       <UilLocationPinAlt size={25} className="text-white mx-1 cursor-pointer transition ease-out hover:scale-125" onClick={handlelocationclick}/>
       </div>
       <div className='flex flex-row w-1/4 items-center justify-center'>
        <button name="metric" className='text-xl text-white  font-light hover:scale-125 transition ease-out' onClick={handleunitchange}>°C
           

        </button>
        <p className='text-xl text-white mx-1'> |</p>
        <button name='imperial' className='text-xl text-white  font-light hover:scale-125 transition ease-out'onClick={handleunitchange}>°F
           
        </button>

       </div>
    </div>
  )
}

export default Inputs