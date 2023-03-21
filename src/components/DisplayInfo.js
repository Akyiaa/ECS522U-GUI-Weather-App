import React from "react";
import location from '../icons/location.png'
import { ready } from "./ReadyOrNot";
import { Link, useSearchParams } from "react-router-dom";
import { iconURLFromCode } from "../services/weatherService";

/*Shows the second page when a forecast icon is clicked */

function DisplayInfo(){

    //get information from url
    const [searchParams, setSearchParams] = useSearchParams();
    //2 different parameters available in url depending on icon clicked
    //item -> info shown from normal hourly forecast
    //final -> info shown from events forecast
    let item = searchParams.get("item") || searchParams.get("final")
    //parse item array into object
    const itemObject = JSON.parse(item);

    return(
        <section id="display">
            <button id="home-btn"><Link to="/">Home</Link></button>
            
            <section id="display-main">
                <div id = "display-top">
                    <img src={iconURLFromCode(itemObject.item.icon)} width="150vw"/>
                    <span className="right-align">
                        <p id="title">{itemObject.item.main || itemObject.item.title}</p>
                        <p id="title-time">{itemObject.item.time}</p>
                    </span>
                </div>

                <button id = "display-loc"> 
                    <img src={location}/>
                    London
                </button>

                <div id="display-tempfore">
                    <p>Temperature: <span className="right-align">{itemObject.item.temp}°</span></p>
                    <p>Forecast: <span className="right-align">{itemObject.item.main || itemObject.item.forecast}</span></p>
                </div>

                <div id="display-extra">
                    <p>Description: <span className="right-align">{itemObject.item.desc}</span></p>
                    <p>Humidity: <span className="right-align">{itemObject.item.humid}%</span></p>
                    <p>Clouds: <span className="right-align">{itemObject.item.cloud}%</span></p>
                </div>

                <div className="ready">
                    {ready(itemObject.item.main || itemObject.item.forecast)}
                </div>

            </section>
        </section>
    )
}

export default DisplayInfo;
