import React from "react";
import scarf from '../icons/scarf.png'
import umbrella from '../icons/umbrella.png'
import boots from '../icons/snowboots.png'
import jacket from '../icons/puffercoat.png'
import smallcoat from '../icons/light_coat.png'
import sunglass from '../icons/sunglass.png'
import hoodie from '../icons/hoodie.png'

/*Returns clothe images depending on weather conditions*/

function Clothes({weather:{temp,weather:{icon}}}){
        
        const clotheRecomImg = () =>{
            if (icon == "13d" || icon == "13n"){//snow
                return <img src={boots} width="100%"/>}
            
            if (icon == "10d" || icon == "10n"){//rain
                return <img src={umbrella} width="100%"/>}

            if (temp <= 5){
                return <img src={jacket} width="100%"/>}

            if (temp < 13){
                return <img src={scarf} width="100%"/>}

            if (temp >= 12 && temp <=19){
                return <img src={smallcoat} width="100%"/>}

            if(temp >= 20 && icon == "01d"){//sunny
                return <img src={sunglass} width="100%"/>}

            //if no conditions match:
            return <img src={hoodie} width="100%"/>
        }

        return(clotheRecomImg())
}

export default Clothes;