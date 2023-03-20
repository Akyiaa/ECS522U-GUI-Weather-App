import React from "react";

/*Shows the daily temperature*/
function Temperature({weather : {temp}}){
    return <div>{`${temp.toFixed()}°`}</div>
}

export default Temperature;