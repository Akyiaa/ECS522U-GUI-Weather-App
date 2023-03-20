import React from "react";

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
export {ready}
