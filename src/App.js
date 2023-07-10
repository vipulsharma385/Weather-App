import React, { useState,useEffect } from 'react';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import './App.css';
import TopButton from './components/TopButton';
import Inputs from './components/Inputs';
import Location from './components/Location';
import Temperature from './components/Temperature';
import Forecast from './components/Forecast';

import getformatdata from './services/weatherservice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

const [query,setQuery]=useState({q:'berlin'})
const [units,setUnits]=useState('metric')
const [weather,setWeather]=useState(null)

useEffect(()=>{
  const fetchweather=async()=>{
    const message=query.q ? query.q:'current location';
    toast.info('Fetching weather for '+ message);
  await getformatdata({...query,units}).then((data)=>
  {

    toast.success(`Sucessfully fetched weather for ${data.name}, ${data.country}`);
    setWeather(data);
  });
    
  };
  
  fetchweather();
},[query,units]);

const formatbackground=()=>{
  if(!weather) return 'from-cyan-700 to to-blue-700 h-fit';
  const threshold=units==='metric'? 20:60
  if(weather.temp<=threshold)
  return 'from-cyan-700 to to-blue-700 h-fit';

  return 'from-yellow-700 to-orange-700';
}



  return (
  <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}>

<TopButton setQuery={setQuery}/>
<Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>


{weather &&
(
  <div>
<Location weather={weather}/>
<Temperature weather={weather}/>
<Forecast title="Hourly Forcast"  items={weather.hourly}/>
<Forecast title="Daily Forcast"  items={weather.daily}/>
</div>
)}


<ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
  </div>


  
  );
}

export default App;
