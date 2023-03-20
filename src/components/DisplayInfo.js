import React from "react";
import location from '../icons/location.png'
import { ready } from "./ReadyOrNot";
import { Link, useSearchParams } from "react-router-dom";
import { iconURLFromCode } from "../services/weatherService";

function DisplayInfo(){

    //get information from url
    const [searchParams, setSearchParams] = useSearchParams();
    let item = searchParams.get("item") || searchParams.get("final")//identify param as item

    //parse item array into object
    const itemObject = JSON.parse(item);

    // console.log(itemObject)
    return(
        <section id="display">
            <button id="home-btn"><Link to="/">Home</Link></button>
            
            <section id="display-main">
                <div id = "display-top">
                    <img src={iconURLFromCode(itemObject.item.icon)} width="200vw"/>
                    <p id="title">{itemObject.item.main || itemObject.item.title}</p>
                    <p id="title-time">{itemObject.item.time}</p>
                </div>

                <button id = "display-loc"> 
                    <img src={location}/>
                    London
                </button>

                <div id="display-tempfore">
                    {/* {console.log(itemObject.item.temp)} */}
                    <p>Temperature: <span className="right-align">{itemObject.item.temp}°</span></p>
                    <p>Forecast: <span className="right-align">{itemObject.item.main || itemObject.item.forecast}</span></p>
                </div>

                <div id="display-extra">
                    {/* {console.log(itemObject.item.desc)} */}
                    <p>Description: <span className="right-align">{itemObject.item.desc}</span></p>
                    <p>Humidity: <span className="right-align">{itemObject.item.humid}%</span></p>
                    <p>Wind Speed: <span className="right-align">{itemObject.item.wind}m/s</span></p>
                </div>

                <div className="ready">
                    {ready(itemObject.item.main || itemObject.item.forecast)}
                    Check out the recommended clothing!
                </div>

            </section>
        </section>
    )
}

export default DisplayInfo;

/*Input:
Normal Forecast
    Hourly[x] info

Table Forecast
    SelectedDay info
    final Array {main icon, avg temp, //main Main}

    avg/accumulated -> precipitation, humidity, wind
 */