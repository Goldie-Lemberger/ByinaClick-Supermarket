import React, { useState, useEffect } from 'react'
import { CartItem } from './cartItem/CartItem';
import Button from 'react-bootstrap/Button'
import './Cart.css'
import { useHistory } from "react-router-dom";
import { FaRegCreditCard } from 'react-icons/fa'
import { Modal } from 'react-bootstrap';

export default function Cart(props) {
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [updateCart, setUpdateCart] = useState(false);
    const [shipping, setShipping] = useState(50);
    const [totalPrice, setTotalPrice] = useState(0);
    const [show, setShow] = useState(false);
    const open = () => setShow(true);
    const close = () => setShow(false);

    let history = useHistory();

    const goBack = () => {
        history.push({
            pathname: './../startBuy'
        })
    }

    const goToPayment = () => {
        if (cartItems.length > 0) {
            history.push({
                pathname: '/cart/payment',
            })
        }
        else {
            open()
        }
    }
    const total = (cart) => {
        let sum = cart.reduce(function (prev, current) {
            return prev + +current.amount * current.priceItem
        }, 0);
        setPrice(sum.toFixed(2));
        if (JSON.parse(localStorage.user).type === "BusinessCustomer") {
            setDiscount((sum * 0.1).toFixed(2));
            setShipping(20);
        }
    }
    useEffect(() => {
        let cart_ = JSON.parse(localStorage.cart);
        setCartItems(cart_.cart);
        total(cart_.cart);
        setTotalPrice(cart_.totalPrice)
    }, [updateCart])

    return (
        <div>
            <div className="container ">
                <div className="row">
                    <div className="col-xl-9 col-md-8">
                        <h2 className="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-secondary">
                            <span>Products</span>
                            <Button variant="outline-dark" onClick={goBack}>
                                Continue shopping</Button></h2>
                        {Object.keys(cartItems).map((index) => {
                            return (
                                <div key={index}>
                                    <table className="table table-borderless ">
                                        <tbody>
                                            <CartItem cart={cartItems[index]} onUpdateSumCart={props.onUpdateSumCart} onUpdateCart={() => setUpdateCart(!updateCart)} />

                                        </tbody>
                                    </table>
                                </div>)
                        })}
                    </div>
                    <div className="col-xl-3 col-md-4 pt-3 pt-md-0">
                        <h2 className="h6 px-4 py-3 bg-secondary text-center">Subtotal</h2>
                        <div className="h3 font-weight-semibold text-center py-3">price: {price}</div>
                        <hr />

                        <div className="pt-4">
                            <div className="accordion" id="cart-accordion">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="accordion-heading font-weight-semibold">Payment</h5>
                                    </div>
                                    <div className="collapse show" id="promocode" >
                                        <div className="card-body" >
                                            <table className="table table-dark table-hover">
                                                <tbody>
                                                    <tr>
                                                        <td>Shipping</td>
                                                        <td>{shipping}</td>
                                                    </tr>
                                                    {(JSON.parse(localStorage.user).type === "BusinessCustomer") &&
                                                        <tr>
                                                            <td> 10% discount for business customer </td>
                                                            <td>-{discount}</td>
                                                        </tr>}
                                                    <tr><td>Final payment</td>
                                                        <td>{totalPrice.toFixed(2)}</td></tr>
                                                    <tr><td colSpan="2" className="td-contain-hover-button">
                                                        <Button className="hoverButton btn btn-dark" variant="dark" onClick={goToPayment}>
                                                            <FaRegCreditCard fontSize="30" />
                                                            <b>{'  '}To Payment</b></Button>
                                                    </td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <Modal show={show} onHide={close}>
                    <Modal.Body>
                        To proceed to payment, the basket must be filled
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    )
}
