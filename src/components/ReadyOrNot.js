import React from "react";

/*Shows message at bottom of page if user is ready 
to go to uni based on weather conditions*/
function ReadyOrNot({weather:{weather:{main}}}){
        return(ready(main))
}

const ready = (main) =>{
    if (main=="Rain" || main=="Thunderstorm"){
        return <p>NOT ready for uni :(</p>
    }
    else{
        return <p>Ready for uni! :)</p>
    }
}


export default ReadyOrNot;
export {ready} //this function is used in DisplayInfo.js
