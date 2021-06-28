import React from 'react'
import { NavLink } from 'react-router-dom';
import './Footers.css'


export default function Footers(props) {
    return (
        <div className="container-fluid_ pb-0 mb-0 justify-content-center text-light ">
            <footer>
                <div className="row my-5 justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                                <h3 className="text-muted mb-md-0 mb-5 bold-text">Buy in a Click.</h3>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h5 className="mb-3 mb-lg-3 bold-text "><b>MENU</b></h5>
                                <ul className="list-unstyled">
                                    <li ><NavLink exact className="nav-link nav-link_color" to="/" >Home</NavLink></li>
                                    <li ><NavLink exact className="nav-link nav-link_color" to="/" onClick={() => props.setShowAbout(true)}>About</NavLink></li>
                                    <li ><NavLink exact className="nav-link nav-link_color" to="/faq" >FAQ</NavLink></li>
                                </ul>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>ADDRESS</b></h6>
                                <p className="mb-1">Etrog 85</p>
                                <p>Givat Ze'ev</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                <small className="rights">
                                    <span>&#174;</span>All Rights Reserved.</small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                                <h6 className="mt-55 mt-2 text-muted bold-text"><b>Contact</b></h6><small>
                                    <span><i className="fa fa-envelope" aria-hidden="true" />
                                    </span> buyinaclick12@gmail.com</small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
