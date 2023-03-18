import React from "react";
import { iconURLFromCode } from "../services/weatherService";
import {week} from "../services/Table";

//SHOULD HOURLY SLICE BE 0-24-> AVAILABLE FOR 24 HOURS OF THE DAY?
function Forecast({day, items}){
    //console.log(items)
    let selectedDay = week[day[0].title]
    let finalArray = []; 
    //forecastTime -> ['18:00', '19:00', '20:00', '21:00']
    //items -> contains time, title, icon etc
    let forecastTime = items.map(item =>(item.time))
    let currentArray = forecastTime[0].split(":")
    //console.log(day[0].title)
    

    const normalForecast = () =>{
        return(
            <section className="forecast-container">
                {items.slice(0,3).map(item =>(
                    <div>
                        <p>{item.time}</p>
                        <img src={iconURLFromCode(item.icon)} width="100vw"/>
                        <p>{`${item.temp.toFixed()}°`}</p>
                    </div>
                ))}
        </section>
        )
    }

    //If no timetable for the day
    if(selectedDay == undefined){
        return(normalForecast())
    }

    for(var k=0; k<selectedDay.length; k++){//for each event in the day
        console.log("k: " + k)
        let accumTemp = [] //contains all the temp for the time period
        let accumIcon = [] 
        let accumID = []
        //console.log(items)
        let avgTemp;
        let mainIcon;
        
        let selStart = selectedDay[k].startTime.split(":")
        let selEnd = selectedDay[k].endTime.split(":")
        console.log("selStart: " + selStart + "/ selEnd: " + selEnd)
        
        //get first index which holds hour; eg '09', '23'
        let selStartHour = selStart[0]
        let selEndHour = selEnd[0]
        let currentHour = currentArray[0]

        //if endTime is not less than currentTime
        //if time is 9am, can't show for something that ends at 8am
        if(selEndHour >= currentHour){
            console.log("end Hour: " + selEndHour + " is greater/= to current hour: " + currentHour)
            //get the information from currentTime to endTime
            //from 9-11
            if(selStartHour == selEndHour){
                console.log("EQUAL")
                accumTemp.push(items[selStartHour].temp)
                accumIcon.push(items[selStartHour].icon)
                accumID.push(items[selStartHour].id)
            }
            else{
                console.log("ELSE: start:- " + selStartHour + " end:- " + selEndHour)
                //works when have same num of digits. eg 7-8, 18-21
                for(var x=Number(selStartHour); x<=Number(selEndHour); x++){
                    //console.log("for loop between: " + selStartHour + " and " + selEndHour)
                    //console.log("x: " + x)
                    //console.log(items[x])
                    accumTemp.push(items[x].temp)
                    accumIcon.push(items[x].icon)
                    accumID.push(items[x].id)
                }
            }
            
            console.log("accumTemp: " + accumTemp)
            //finding average temp
            let total = 0
            //console.log("accvumTemp " + accumTemp)
            for(x in accumTemp){
                //console.log("x: " + accumTemp[x])
                total += accumTemp[x]
            }
            avgTemp = total/accumTemp.length
            //console.log("avg: " + avgTemp)

            //find 'main' main
            const allEqual = accumIcom => accumIcon.every( v => v === accumIcon[0] )
            if(allEqual){ //if true
                mainIcon = accumIcon[0]
            }
            else{//Choose worst
                //3->5->6->2
                for(var g=0; g<accumID.length; g++){
                    if (accumID[g].charAt(0) == 2){//thunderstorm
                        mainIcon = accumIcon[g]
                    }
                    else if(accumID[g].charAt(0) == 6){//snow
                        mainIcon = accumIcon[g]
                    }
                    else if(accumID[g].charAt(0) == 5){//rain
                        mainIcon = accumIcon[g]
                    }
                    else if(accumID[g].charAt(0) == 3){//drizzle
                        mainIcon = accumIcon[g]
                    }
                    else{
                        mainIcon = accumIcon[0]
                        break
                    }
                }
            }

            finalArray.push({title: `${selectedDay[k].title}`, time: `${selectedDay[k].startTime} - ${selectedDay[k].endTime}`, icon: `${mainIcon}`, temp: `${avgTemp.toFixed()}°`})
        }
        else{
            //console.log(selEndHour + " less than " + currentHour)
        }

    }
    //RETURNING ACCUMULATED INFO
    console.log(finalArray)
    if (finalArray.length == 0){
        console.log("no timetable info to display yet")
        return(normalForecast())
    }
    else{
        console.log("info displayed!" )
        console.log(items)
        //return(normalForecast())
        return(
            <section className="forecast-container">
                {finalArray.map(f =>(
                    <div>
                        <p>{f.temp}</p>
                        <img src={iconURLFromCode(f.icon)} width="100vw"/>
                        <p>{f.title}</p>
                        <p id="time-size">{f.time}</p>
                    </div>
                ))}
            </section>
        )
    }

}

export default Forecast;

/*return( 
        <section className="forecast-container">
                {items.map(item =>(
                    <div>
                        <p>{item.time}</p>
                        <img src={iconURLFromCode(item.icon)} width="100vw"/>
                        <p>{`${item.temp.toFixed()}°`}</p>

                    </div>
                ))}
        </section>
    )*/ 