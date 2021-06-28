import React, { useState, useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Barcode from '../../asset/Barcode.png';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { FaRegUser } from "react-icons/fa"
import { TiShoppingCart } from 'react-icons/ti'
import { BiLogOut } from 'react-icons/bi'
import { useHistory, NavLink, Link } from "react-router-dom";

import './Header.css'

export default function Header(props) {
    const handleShow = () => { props.setShow(true); }
    let history = useHistory();

    const [totalItems, setTotalItems] = useState(0);

    const total = (cart) => {
        let sum = cart.reduce(function (prev, current) {
            return prev + +current.amount
        }, 0);
        setTotalItems(sum);
    }

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            let cart_ = JSON.parse(localStorage.cart);
            total(cart_.cart);
        }
    }, [props.updateSumCart])

    const goToCart = () => {
        if (localStorage.getItem('user') !== null) {
            history.push("/cart")
        }
        else {
            handleShow();
        }
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" >
                <Container>
                    <NavLink to="/" >
                        <img src={Barcode} alt="" width="45" height="35" className="d-inline-block align-top" />
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto ">
                            <NavDropdown id="dropdown-basic-button" variant="dark" title="Products">
                                <NavLink className="dropdown-item" to="/fruitsAndVegetables">Fruits And Vegetables</NavLink>
                                <NavLink className="dropdown-item" to="/dairyAndEggProducts">Dairy And Egg</NavLink>
                                <NavLink className="dropdown-item" to="/dryProducts">Dry Products</NavLink>
                                <NavLink className="dropdown-item" to="/drinks">Drinks</NavLink>
                            </NavDropdown>

                            <NavLink className="nav-link" to="/newClient">SignUp</NavLink>
                            <NavLink className="nav-link" to="/comments">Comments</NavLink>
                            <NavLink className="nav-link" to="/faq">Faq</NavLink>


                        </Nav>
                        <Nav >
                            {(localStorage.getItem('user') !== null) && <div style={{ color: "rgb(255,255,255)" }}><Button className="btn btn-dark" onClick={() => { props.signout(); setTotalItems(0) }}>
                                <BiLogOut className="icon-t" /></Button>
                                {JSON.parse(localStorage.user).firstName} {JSON.parse(localStorage.user).lastName}</div>}

                            <Button className="btn btn-dark" onClick={handleShow} size="sm"  >
                                <FaRegUser className="icon" /></Button>
                            <table className="table-cart">
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td rowSpan="2">
                                            <Button className="btn btn-dark " onClick={goToCart} ><TiShoppingCart className="icon-t" /></Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="cart-items-container">
                                            <span className="sumItesInCart">{totalItems}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>









    )
}


