import React from "react";

function Table({day, items}){
    //items CONTAINS ALL 3 ARRAYS!    
    // console.log(dayTitle)
    // console.log(items)
    // console.log(selectedDay)
    let selectedDay = Thu; //does not work without this initialisation
    const matchCond = () =>{
        //console.log(`temp is ${ temp}!`)
        for (var i = 0; i < week.length; i++) {
            if (week[i] == `${day[0].title}`){
                selectedDay = week[i];
                break;
            }
        }
        
        let start = items.map(item =>(item.time))
        console.log(selectedDay[0].startTime)
        for(var k = 0; k< start.length; k++){
            if(selectedDay[0].startTime == start[k]){
                console.log("true" + k)
                return (
                <p>{selectedDay[k].title}</p>
                )
            }
        }
       
        
    }

    return(matchCond())

}

const Mon = [
    {
        title: "OS Lecture",
        startTime: "02:00 PM",
        endTime: "04:00 PM",
    },
    {
        title: "GUI Lab",
        startTime: "04:00 PM",
        endTime: "06:00 PM",
    }
    ]
    
    const Teu = [
    {
        title: "IPA Lecture",
        startTime: "01:00 PM",
        endTime: "03:00 PM",
    },
    {
        title: "OS Lecture",
        startTime: "03:00 PM",
        endTime: "04:00 PM",
    },
    {
        title: "GUI Lecture",
        startTime: "04:00 PM",
        endTime: "06:00 PM",
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
        startTime: "04:00 PM",
        endTime: "06:00 PM",
    }
    ]
    
    const Thu = [
    {
        title: "OS Lecture",
        startTime: "04:00 AM",
        endTime: "04:00 PM",
    },
    {
        title: "GUI Lab",
        startTime: "05:00 AM",
        endTime: "06:00 PM",
    }
    ]
    
    const week= [Mon, Teu, Wed, Thu]
    

export default Table;