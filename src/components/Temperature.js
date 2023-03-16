import React from "react";

function Temperature({weather : {temp}}){
    return <div>{`${temp.toFixed()}°`}</div>
}

export default Temperature;