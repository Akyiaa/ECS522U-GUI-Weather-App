import React from "react";

function ReadyOrNot({weather:{weather:{main}}}){
    const ready = () =>{
        if (main=="rain" || main=="thunderstorm"){
            return <p>NOT Ready for uni</p>
        }
        else{
            return <p>Ready for uni!</p>
        }
    }

    return(ready())
}

export default ReadyOrNot;

