import React from "react";
import { iconURLFromCode } from "../services/weatherService";
import {week} from "../services/Table";
import {Link} from "react-router-dom";

/*Shows the forecast based on timetable events or hourly forecast */
function Forecast({day, items}){

    //matching the current day(day[0].title) to the day in the timetable(week[i])
    let selectedDay = week[day[0].title]
    //stores all the averaged information for events on the timetable
    let finalArray = []; 
    //forecastTime -> contains time of item
    let forecastTime = items.map(item =>(item.time))
    //Array of current time info (eg split "16:00" into ["16", "00"])
    let currentArray = forecastTime[0].split(":")

    //If no timetable for the day
    if(selectedDay == undefined || selectedDay == null){
        return(normalForecast(items))
    }

    //getting information for each event in the day
    for(var k=0; k<selectedDay.length; k++){
        
        let accumTemp = [] //contains all the temps for the event period
        let accumIcon = [] //contains all icons ...
        let accumMain = []
        let accumDesc = []
        let accumHumid = []
        let accumCloud = []

        //getting time -(eg split "16:00" into ["16", "00"])
        let selStart = selectedDay[k].startTime.split(":")
        let selEnd = selectedDay[k].endTime.split(":")
        
        //get first index which holds hour; eg '09', '23'
        //and convert to number/int
        let selStartHour = Number(selStart[0])
        let selEndHour = Number(selEnd[0])
        let currentHour = Number(currentArray[0])

        //Forecast for events that have not ended should be shown
        //if an event is from 12-14 and the current time is 10, 14>10, therefore show
        //if an event is from 12-14 and the current time is 18, 14<18, therefore hide
        if(selEndHour > currentHour){
            //if event starts and ends in same hour
            if(selStartHour == selEndHour){
                //find the index of the start Hour in items array
                let j = findHour(items, selStartHour)

                accumTemp.push(items[j].temp)
                accumIcon.push(items[j].icon)
                accumMain.push(items[j].main)
                accumDesc.push(items[j].desc)
                accumHumid.push(items[j].humid)
                accumCloud.push(items[j].cloud)
            }
            else{
                //find the index of the start Hour in items array
                let m = findHour(items, selStartHour)
                let change;

                //loop from start of event to the end of event
                //by finding the number of house between the event, i.e change
                if(selStartHour < currentHour){ 
                    //if the event has already started, loop from current hour
                    change = selEndHour - currentHour }
                else{
                    change = selEndHour - selStartHour }
                
                //add the index of the event hour; m
                //for the amount of time the event occurs; change hours
                for(var x=0; x<change; x++){
                    accumTemp.push(items[m].temp)
                    accumIcon.push(items[m].icon)
                    accumMain.push(items[m].main)
                    accumDesc.push(items[m].desc)
                    accumHumid.push(items[m].humid)
                    accumCloud.push(items[m].cloud)
                    m++; //increase hour index each time
                }
            }
            
            /**FINDING averages OR worst conditions**/
            let avgTemp = findAvg(accumTemp)
            let mainIcon = findMainIcon(accumIcon, accumMain)
            let mainMain = findMain(accumMain)
            let mainDesc = findMain(accumDesc)
            let avgHumid = findAvg(accumHumid)
            let avgCloud = findAvg(accumCloud)
            
            //push all values into final array
            finalArray.push({title: `${selectedDay[k].title}`, time: `${selectedDay[k].startTime} - ${selectedDay[k].endTime}`, icon: `${mainIcon}`, temp: `${avgTemp.toFixed()}`, forecast: `${mainMain}`, desc: `${mainDesc}`, humid: `${avgHumid.toFixed()}`, cloud: `${avgCloud.toFixed()}`})
        }

    }

    //if no events in timetable, final.length would be empty, show normal forecast
    if (finalArray.length == 0){
        return(normalForecast(items))
    }
    else{
        //else show accumulated information from final array
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

/*FIND THE items INDEX TO COLLECT INFORMATION FROM*/
const findHour = (items, start) =>{
    for(var j in items){
        let itemTime = items[j].time.split(":")
        let itemNum = Number(itemTime[0])

        if(start < itemNum){
            return 0 }
        if (itemNum == start){
            return j; }
    }
}

/*FINDING AVGS FUNCTION*/
const findAvg = (accumArray) =>{
    let total = 0
    for(var x in accumArray){
        total += accumArray[x]
    }
    return total/accumArray.length
}


/**FIND MAIN ICON**/
const findMainIcon = (accumIcon, accumMain) =>{
    //choose worst condition
    for(var g=0; g<accumMain.length; g++){
        if (accumMain[g] == "Thunderstorm"){//thunderstorm
            return accumIcon[g] }
        else if(accumMain[g] == "Snow"){//snow
            return accumIcon[g] }
        else if(accumMain[g] == "Rain"){//rain
            return accumIcon[g] }
        else if(accumMain[g] == "Drizzle"){//drizzle
            return accumIcon[g] }
    }
    return accumIcon[0]
}

/**MAIN DESCRIPTION, MAIN**/
const findMain = (accumArray) =>{
    //Choose worst condition
    for(var g=0; g<accumArray.length; g++){
        if (accumArray[g].includes("heavy")){ //this branch is specific to the description
            return accumArray[g] }
        else if(accumArray[g].includes("thunderstorm")){
            return accumArray[g] }
        else if(accumArray[g].includes("snow")){
            return accumArray[g] }
        else if(accumArray[g].includes("rain")){
            return accumArray[g] }
        else if(accumArray[g].includes("drizzle")){
            return accumArray[g] }
    }
    return accumArray[0]
}

export default Forecast;