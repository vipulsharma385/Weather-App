import { DateTime } from "luxon";

const API_KEY='27f50bde0cfb15ffaccd0cd8797df7d6';
const BASE_URL="https://api.openweathermap.org/data/2.5";

const getdata=(infoType,searchParams)=>
{
    const url=new URL(BASE_URL + "/" + infoType);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY});

    return fetch(url).then((res)=>res.json());
};

const curr=(data)=>
{
    const{
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise},
        weather,
        wind:{speed}
    }=data
const {main: details,icon}=weather[0]
    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,details,icon,speed}
}

const formatforecastweather=(data)=>{
    let {
        timezone,daily,hourly
    }=data;
    daily=daily.slice(1,6).map(d=>{
     return {
        title: formattolocaltime(d.dt,timezone,'ccc'),
        temp: d.temp.day,
        icon: d.weather[0].icon
     }
    });

    hourly=hourly.slice(1,6).map(d=>{
        return {
           title: formattolocaltime(d.dt,timezone,'hh:mm a'),
           temp: d.temp,
           icon: d.weather[0].icon
        }
       });

       return {timezone,daily,hourly};
};

const getformatdata=async(searchParams)=>
{
    const currentweather=await getdata('weather',searchParams).then(curr)

    const {lat,lon}=currentweather;
    const formatforecast=await getdata('onecall',{
        lat,lon,exclude:'current,minutely,alerts',
        units:searchParams.units,
    }).then(formatforecastweather)

    return  {...currentweather,...formatforecast};
}
const formattolocaltime=(secs,zone,format="cccc,dd LLL yyyy' | Local time: 'hh:mm a")=>DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconurl=(code)=>`http://openweathermap.org/img/wn/${code}@2x.png`;



export default getformatdata;

export {formattolocaltime, iconurl};