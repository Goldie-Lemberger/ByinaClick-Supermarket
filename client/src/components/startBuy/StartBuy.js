import React from 'react'
import './StartBuy.css'

import Vegetable from '../../asset/vegetable.png'
import dairyProducts from '../../asset/dairy-products.png'
import softdrinks from '../../asset/softdrinks.png'
import canned from '../../asset/canned-food.png'



export default function StartBuy({ history }) {
    const gotoFruitsAndVegetables = () => {
        history.push("/fruitsAndVegetables");
    }
    const gotoDairyAndEggProducts = () => {
        history.push("/dairyAndEggProducts");
    }
    const gotoDrinks = () => {
        history.push("/drinks");
    }
    const gotoDryProducts = () => {
        history.push("/dryProducts");
    }

    return (
        <div className="container topMerge">
            <div >
            <div className="row row-cols-2">
                <div className="col"><button className="col btn-lightBlue btn-outline-dark" onClick={gotoFruitsAndVegetables}>
                    <img className="imgSize lightBlue" src={Vegetable} alt={Vegetable}/>
                        Fruits and Vegetables
                        </button></div>
                <div className="col"><button className="col btn-yellow btn-outline-dark" onClick={gotoDairyAndEggProducts}>
                    <img className="imgSize yellow" src={dairyProducts} alt={dairyProducts} />
                        Dairy and egg products
                        </button></div>
    
                <div className="col">     <button className="col btn-orange btn-outline-dark" onClick={gotoDrinks}>
                    <img className="imgSize orange" src={softdrinks} alt ={softdrinks}/>
                        Drinks
                        </button></div>
                <div className="col">  <button className="col btn-red btn-outline-dark" onClick={gotoDryProducts}>
                    <img className="imgSize red" src={canned}  alt={canned} />
                        Dry products
                        </button></div>
            </div>
            </div>

        </div>
    )
}
