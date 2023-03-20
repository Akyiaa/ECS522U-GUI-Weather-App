import React from "react";
import location from '../icons/location.png'
import { Link, useSearchParams } from "react-router-dom";
import { iconURLFromCode } from "../services/weatherService";

function DisplayInfo(){
    //get information from url
    const [searchParams, setSearchParams] = useSearchParams();
    const item = searchParams.get("item") //identify param as item
    //parse item array into object
    const itemObject = JSON.parse(item);

    console.log(itemObject)
    return(
        <section id="display">
            <button id="home-btn"><Link to="/">Home</Link></button>
            
            <section id="display-main">
                <div id = "display-top">
                    <img src={iconURLFromCode(itemObject.item.icon)} width="200vw"/>
                    <p id="main">{itemObject.item.main}</p>
                    <p id="main-time">{itemObject.item.time}</p>
                </div>

                <button id = "display-loc"> 
                    <img src={location}/>
                    London
                </button>

                <div id="display-tempfore">
                    {/* {console.log(itemObject.item.temp)} */}
                    <p>Temperature: <span class="right-align">{itemObject.item.temp}°</span></p>
                    <p>Forecast: <span class="right-align">{itemObject.item.main}</span></p>
                </div>

                <div id="display-extra">
                    {/* {console.log(itemObject.item.desc)} */}
                    <p>Description: <span className="right-align">{itemObject.item.desc}</span></p>
                    <p>Humidity: <span className="right-align">{itemObject.item.humid}%</span></p>
                    <p>Wind Speed: <span className="right-align">{itemObject.item.wind}m/s</span></p>
                </div>

                <div className="ready">
                    {ready(itemObject.item.main || itemObject.item.forecast)}
                </div>

            </section>
        </section>
    )
}

export default DisplayInfo;

/*Accessing Link/info
// your link creation
const newTo = { 
  pathname: "/category/595212758daa6810cbba4104", 
  param1: "Par1" 
};
// link to the "location"
// see (https://reacttraining.com/react-router/web/api/location)
<Link to={newTo}> </Link>

// In your Category Component, you can access the data like this
this.props.match.params.catId // this is 595212758daa6810cbba4104 
this.props.location.param1 // this is Par1
*/

/*Input:
Normal Forecast
    Hourly[x] info

Table Forecast
    SelectedDay info
    final Array {main icon, avg temp, //main Main}

    avg/accumulated -> precipitation, humidity, wind
 */