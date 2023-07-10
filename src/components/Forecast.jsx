import React from 'react'
import { iconurl } from '../services/weatherservice';

function Forecast({title,items}) {
  return (
    <div>
<div className='flex items-center justify-center mt-6'>
    <p className='text-white font-medium uppercase'>{title}</p>
</div>
<hr className='my-2'/>
    <div className='flex flex-row items-center justify-center text-white'>

    {items.map((item)=>(
                    <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>
                        {item.title}
        
                    </p>
                    <img className='w-12 my-1 ' src={iconurl(item.icon)}></img>
                    <p className='font-medium '>
                     {`${item.temp.toFixed()}`}°C
                    </p>
        
                </div>
        
                ))}
        
      


   
       
    
       </div> 
    </div>
  );
}

export default Forecast;