import React from "react";

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

    const Sat = [
        {
            title: "OS Lecture",
            startTime: "5:00",
            endTime: "10:00",
        },
        {
            title: "GUI Lab",
            startTime: "13:00",
            endTime: "13:15",
        },
        {
            title: "IPA Meeting",
            startTime: "18:00",
            endTime: "21:15",
        }
        ]
    
    const week= {"Mon": Mon, "Tue": Teu, "Wed": Wed, "Thu":Thu, "Sat": Sat}
//expotrt Table    

export {week}

/*Input :- 
hourly:
    temp
    weather:
        main
        icon
        desciption

//for each range of hours:
    ->mention event title
    ->mention time range
    ->find average temperature
    ->icons:
        if same -> show one
        if 2 -> show worst weather
        if 2+ pick most occuring OR worst

*/
