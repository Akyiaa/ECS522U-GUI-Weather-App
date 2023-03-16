import React from "react";
import scarf from '../icons/scarf.png'

function Clothes({
    weather:{
        temp,
        weather:{
            icon
}}}){
           

        const clotheRecomImg = () =>{
            //console.log(`temp is ${ temp}!`)
            if (temp < 10){
                return <div>
                    <img src={scarf} width="100%"/>
                </div>
            }
            if(temp > 15 && icon == "01d"){//sunny
                return <div>
                    <img src={"../sunglass.png"}/>
                </div>
            }
        }

        return(clotheRecomImg())

}

export default Clothes;