import React from 'react'
import './Home.css'
import shop from '../../asset/Shop.png'
import { NavLink } from 'react-router-dom';

export default function Home() {

    return (
        <div className="container">
            <div className="row g-0">
                <div className="col-6">
                    <div className="container">
                        <img className="sizeImg" src={shop} alt="shop" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="masthead">
                        <div className="col ">
                            <div className="col-lg">
                                <div className="py-5 px-4 masthead-cards ">
                                    <NavLink className="w-50 pr-3 pb-4 m-5" to="/NewClient" >
                                        <div className="card border-0 border-bottom-red shadow-lg shadow-hover">
                                            <div className="card-body text-center"> New Client
                                </div>
                                        </div>
                                    </NavLink>
                                    <NavLink className="w-50 pl-3 pb-4 m-5" to="/startBuy" >
                                        <div className="card border-0 border-bottom-orange shadow-lg shadow-hover">
                                            <div className="card-body text-center">SHOP NOW
                                </div>
                                        </div>
                                    </NavLink>
                                    <NavLink className="w-50 pr-3 pb-4 m-5" to="/faq" >
                                        <div className="card border-0 border-bottom-yellow shadow-lg shadow-hover">
                                            <div className="card-body text-center"> FAQ
                                </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}


