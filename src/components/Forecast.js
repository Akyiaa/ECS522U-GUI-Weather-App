import React from "react";
import { iconURLFromCode } from "../services/weatherService";
import {week} from "../services/Table";
import {Link} from "react-router-dom";

//SHOULD HOURLY SLICE BE 0-24-> AVAILABLE FOR 24 HOURS OF THE DAY?
function Forecast({day, items}){
    //console.log(items)
    let selectedDay = week[day[0].title]
    let finalArray = []; 
    //forecastTime -> ['18:00', '19:00', '20:00', '21:00']
    //items -> contains time, title, icon etc
    let forecastTime = items.map(item =>(item.time))
    let currentArray = forecastTime[0].split(":")
    //console.log(day[0].title)-
  

    //If no timetable for the day
    if(selectedDay == undefined || selectedDay == null){
        return(normalForecast())
    }

    for(var k=0; k<selectedDay.length; k++){//for each event in the day
        //console.log("k: " + k)
        let accumTemp = [] //contains all the temp for the time period
        let accumIcon = [] 
        let accumMain = []
        let accumDesc = []
        let accumHumid = []
        //console.log(items)

        
        let selStart = selectedDay[k].startTime.split(":")
        let selEnd = selectedDay[k].endTime.split(":")
        //console.log("selStart: " + selStart + "/ selEnd: " + selEnd)
        
        //get first index which holds hour; eg '09', '23'
        let selStartHour = selStart[0]
        let selEndHour = selEnd[0]
        let currentHour = currentArray[0]

        //if endTime is not less than currentTime
        //if time is 9am, can't show for something that ends at 8am
        if(selEndHour >= currentHour){
            //console.log("end Hour: " + selEndHour + " is greater/= to current hour: " + currentHour)
            //get the information from currentTime to endTime
            //from 9-11
            if(selStartHour == selEndHour){
                //console.log("EQUAL")
                accumTemp.push(items[selStartHour].temp)
                accumIcon.push(items[selStartHour].icon)
                accumMain.push(items[selStartHour].main)
            }
            else{
                //console.log("ELSE: start:- " + selStartHour + " end:- " + selEndHour)
                //works when have same num of digits. eg 7-8, 18-21
                for(var x=Number(selStartHour); x<=Number(selEndHour); x++){
                    //console.log("for loop between: " + selStartHour + " and " + selEndHour)
                    //console.log("x: " + x)
                    //console.log(items[x])
                    accumTemp.push(items[x].temp)
                    accumIcon.push(items[x].icon)
                    accumMain.push(items[x].main)
                    accumDesc.push(items[x].desc)
                    accumHumid.push(items[x].humid)
                }
            }
            
            /**FINDING AVERAGES**/
            let avgTemp = findAvg(accumTemp)
            let mainIcon = findMainIcon(accumIcon, accumMain)
            let mainMain = findMain(accumMain)
            let mainDesc = findMain(accumDesc)
            let avgHumid = findAvg(accumHumid)
            

            finalArray.push({title: `${selectedDay[k].title}`, time: `${selectedDay[k].startTime} - ${selectedDay[k].endTime}`, icon: `${mainIcon}`, temp: `${avgTemp.toFixed()}`, forecast: `${mainMain}`, desc: `${mainDesc}`, humid: `${avgHumid.toFixed()}`})
        }
        else{
            //console.log(selEndHour + " less than " + currentHour)
        }

    }

    //RETURNING ACCUMULATED INFO
    //console.log(finalArray)
    if (finalArray.length == 0){
        //console.log("no timetable info to display yet")
        return(normalForecast(items))
    }
    else{
        //console.log("info displayed!" )
        //console.log(items)
        return(normalForecast(items))
        return(
            <section className="forecast-container">
                {finalArray.map(item =>(
                    <div className='center'>
                        <p>{item.temp}°</p>
                        <Link to={{pathname:"/displayInfo", search:`final=${JSON.stringify({item})}`}}><img src={iconURLFromCode(item.icon)} width="100vw"/></Link>
                        <p>{item.title}</p>
                        <p id="time-size">{item.time}</p>
                    </div>
                ))}
            </section>
        )
    }

}

/**SHOW NORMAL FORECAST**/
const normalForecast = (items) =>{
    return(
        <section className="forecast-container">
            {items.slice(0,3).map(item =>(
                <div className='center'>
                    <p>{item.time}</p>
                    <Link to={{pathname:"/displayInfo", search:`item=${JSON.stringify({item})}`}}><img src={iconURLFromCode(item.icon)} width="100vw"/></Link>
                    <p>{`${item.temp.toFixed()}°`}</p>
                </div>
            ))}
        </section>
    )
}

/*FINDING AVGS FUNCTIONS*/
const findAvg = (accumArray) =>{
    let total = 0
    //console.log("accvumTemp " + array)
    for(var x in accumArray){
        //console.log("x: " + array[x])
        total += accumArray[x]
    }
    return total/accumArray.length
    //console.log("avg: " + avgTemp)
}


/**FIND MAIN ICON**/
const findMainIcon = (accumIcon, accumMain) =>{
    //find main Icon
    const allEqual = accumIcom => accumIcon.every( v => v === accumIcon[0] )
    if(allEqual){ //if true
        return accumIcon[0]
    }
    else{//Choose worst
        for(var g=0; g<accumMain.length; g++){
            if (accumMain[g] == "Thunderstorm"){//thunderstorm
                return accumIcon[g] }
            else if(accumMain[g] == "Snow"){//snow
                return accumIcon[g] }
            else if(accumMain[g] == "Rain"){//rain
                return accumIcon[g] }
            else if(accumMain[g] == "Drizzle"){//drizzle
                return accumIcon[g] }
            else{
                return accumIcon[0]
            }
        }
    }
}

/**MAIN DESCRIPTION, MAIN**/
const findMain = (accumArray) =>{
    //find main Icon
    const allEqual = accumArray => accumArray.every( v => v === accumArray[0] )
    if(allEqual){ //if true
        return accumArray[0]
    }
    else{//Choose worst
        for(var g=0; g<accumArray.length; g++){
            if (accumArray[g].includes("heavy")){ //this branch is specific to the description
                return accumArray[g] }
            else if(accumArray[g].includes("Thunderstorm")){
                return accumArray[g] }
            else if(accumArray[g].includes("Snow")){
                return accumArray[g] }
            else if(accumArray[g].includes("Rain")){
                return accumArray[g] }
            else if(accumArray[g].includes("Drizzle")){
                return accumArray[g] }
            else{
                return accumArray[0]
            }
        }
    }
}

export default Forecast;
