import React from "react";

function Table({day, items}){
    //items CONTAINS ALL 3 ARRAYS!    
    // console.log(dayTitle)
    // console.log(items)
    // console.log(selectedDay)
    let selectedDay = week[day[0].title];
    let finalArray = []; 
    let forecastTime = items.map(item =>(item.time))
    console.log("foreCast time [" + forecastTime +"]")
    //console.log(selectedDay)
    const matchCond = () =>{
        //GUI Lab - 8:45 - 10:00
        //->show under 8, 9, 10 forecast
        //OS Lectur - 9:30 - 12:30
        //-> show under 9, 10, 11, 12 forecast
        //IPA meeting 9:00 -9:15
        //-> show under 9
        //console.log(selectedDay.length)
        //console.log("test!")
        for(var k = 0; k<selectedDay.length; k++){
            //console.log(selectedDay[0].startTime)
            //array to split time -> how to end the showing of schedule?
            let selStart = selectedDay[k].startTime.split(":")
            let selEnd = selectedDay[k].endTime.split(":")
            let currentArray = forecastTime[k].split(":")
            //get first index which holds hour; eg '09', '23'
            let selStartHour = selStart[0]
            let selEndHour = selEnd[0]
            let currentHour = currentArray[0]

            //currentHour = 7, 8, 9, 10
            //start = 8:45
            //end = 10
            console.log("k: " + k)
            //console.log("select: " + selectedDay.length)
            if (selStartHour == currentHour){
                console.log("startHour: " + selStartHour +" == currentHour: " + currentHour)
                if(selEndHour == currentHour){ //if start and end time are the same
                    console.log("endHour: " + selEndHour +" == currentHour: " + currentHour)
                    finalArray.push(`${selectedDay[k].title}`)
                }
                else{//what if the end time is diff
                    console.log("end and start not equal")
                    // for(var x = selStartHour; x<=selEndHour; x++){
                    //     console.log("for loop: " + x)
                    //     if (x <= currentHour){
                    //         console.log("x: " + x +" <= currentHour: " + currentHour)
                    //         finalArray.push(`${selectedDay[k].title}`)
                    //     }
                    // }

                    for(var x = currentHour; x<=currentHour+2; x++){
                        if(x > selEndHour){
                            break;
                        }
                        else{
                            finalArray.push(`${selectedDay[k].title}`)
                        }
                    }
                }
            }
        } 
        
        console.log("finalArray:" + finalArray)
        return <p>{finalArray}</p>;
    }
    return(matchCond())
}

const Mon = [
    {
        title: "OS Lecture",
        startTime: "14:00",
        endTime: "16:00",
    },
    {
        title: "GUI Lab",
        startTime: "16:00",
        endTime: "18:00",
    }
    ]
    
    const Teu = [
    {
        title: "IPA Lecture",
        startTime: "13:00",
        endTime: "15:00",
    },
    {
        title: "OS Lecture",
        startTime: "03:00 PM",
        endTime: "04:00 PM",
    },
    {
        title: "GUI Lecture",
        startTime: "16:00",
        endTime: "18:00",
    }
    ]
    
    let Wed = [
    {
        title: "OS Lecture",
        startTime: "02:00 PM",
        endTime: "04:00 PM",
    },
    {
        title: "GUI Lab",
        startTime: "16:00",
        endTime: "18:00",
    }
    ]
    
    const Thu = [
    {
        title: "OS Lecture",
        startTime: "21:00",
        endTime: "23:00",
    },
    {
        title: "GUI Lab",
        startTime: "17:00",
        endTime: "18:00",
    }
    ]
    
    const week= {"Mon": Mon, "Tue": Teu, "Wed": Wed, "Thu":Thu}
    

export default Table;