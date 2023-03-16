import React from "react";
import { iconURLFromCode } from "../services/weatherService";

function Forecast({items}){
    //console.log(items)
    return( 
        <section className="forecast-container">
                {items.map(item =>(
                    <div>
                        <p>{item.time}</p>
                        <img src={iconURLFromCode(item.icon)} width="250%"/>
                        <p>{`${item.temp.toFixed()}°`}</p>

                    </div>
                ))}
        </section>
    )
}

export default Forecast;

