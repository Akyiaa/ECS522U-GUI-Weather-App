import React from "react";
import scarf from '../icons/scarf.png'
import umbrella from '../icons/umbrella.png'
import boots from '../icons/snowboots.png'
import jacket from '../icons/puffercoat.png'
import smallcoat from '../icons/light_coat.png'
import sunglass from '../icons/sunglass.png'

function Clothes({weather:{temp,weather:{icon}}}){
           
        const clotheRecomImg = () =>{
            //console.log(`temp is ${ temp}!`)
            if (icon == "13d"){
                return <div>
                <img src={boots} width="100%"/>
                </div>
            }
            
            if (icon == "09d"){
                return <div>
                <img src={umbrella} width="100%"/>
                </div>
            }


            if (temp < 5){
                return <div>
                    <img src={jacket} width="100%"/>
                </div>
            }

            if (temp < 13){
                return <div>
                    <img src={scarf} width="100%"/>
                </div>
            }

            if (temp > 12 && temp <18){
                return <div>
                    <img src={smallcoat} width="100%"/>
                </div>
            }

            
            if(temp > 20 && icon == "01d"){//sunny
                return <div>
                    <img src={sunglass} width="100%"/>
                </div>
            }
        }

        return(clotheRecomImg())

}

export default Clothes;