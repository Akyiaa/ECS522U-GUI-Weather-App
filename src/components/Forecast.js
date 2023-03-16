import React from "react";
import { iconURLFromCode } from "../services/weatherService";

function Forecast({weather:{icon, temp, details}, items}){
    //console.log(items)
    return( 
        <section className="forecast-container">
                {items.map(item =>(
                    <div>
                        <p>{item.time}</p>
                        <img src={iconURLFromCode(item.icon)} width="30%"/>
                        <p>{`${item.temp.toFixed()}°`}</p>

                    </div>
                ))}
        </section>
    )
}

export default Forecast;

