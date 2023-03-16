function timeTable({day, item}){
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
        startTime: "01:00 AM",
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
        startTime: "02:00 PM",
        endTime: "04:00 PM",
    },
    {
        title: "GUI Lab",
        startTime: "04:00 PM",
        endTime: "06:00 PM",
    }
    ]
    
    const week= [Mon, Teu, Wed, Thu]
    let selectedDay = Wed;

    console.log(day)
    console.log(item)
    console.log(selectedDay)
    //item: {time: '12:00 AM', temp: 7.13, icon: '04n', main: 'Clouds'}
    const matchCond = () =>{
        for(let x in week){
            if (x == day){
                selectedDay = x;
                break;
            }
        }

        if (selectedDay.startTime == item.time){
            return (
                    `${selectedDay.title}`
            )
        }
    }

    return(matchCond())
}


