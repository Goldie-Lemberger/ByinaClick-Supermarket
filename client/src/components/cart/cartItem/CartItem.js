import React, { useState } from "react";
import './CartItem.css'
import { FiRefreshCw, FiTrash2 } from "react-icons/fi"
import { FaShekelSign } from "react-icons/fa"


export function CartItem(props) {
    const [amountItem, setAmountItem] = useState(0);

    const removeProduct = (id) => {
        let cart_ = JSON.parse(localStorage.cart);
        const item = cart_.cart.findIndex((item_) => {
            return item_.id === id;
        });
        cart_.totalPrice -= Number(cart_.cart[item].priceItem) * Number(cart_.cart[item].amount)
        cart_.cart.splice(item, 1);
        localStorage.cart = JSON.stringify(cart_);
        props.onUpdateCart();
        props.onUpdateSumCart();
    }
    const updateProduct = (id) => {
        let cart_ = JSON.parse(localStorage.cart);
        const item = cart_.cart.findIndex((item_) => {
            return item_.id === id;
        });
        cart_.cart[item].amount += Number(amountItem);
        cart_.totalPrice += Number(cart_.cart[item].priceItem) * Number(amountItem);
        setAmountItem(0);
        localStorage.cart = JSON.stringify(cart_);
        props.onUpdateCart();
        props.onUpdateSumCart();
    }
    return (
        <tr className="container d-sm-flex justify-content-between my-5 cart-item-container">
            <td className="media d-block d-sm-flex text-center text-sm-left">
                <div className="cart-item-thumb mx-auto mr-sm-4"><img src={props.cart.imageItem} alt={props.cart.nameItem} /></div>
            </td>
            <td className="media-body pt-4">
                <h3 className="product-card-title font-weight-semibold border-2 pb-0">{props.cart.nameItem}</h3>
                <div className="font-size-sm"><span className="text-muted mr-2">information: </span>{props.cart.informationItem}</div>
                <div className="font-size-lg text-primary pt-2">{props.cart.priceItem} <FaShekelSign fontSize="15" /></div>
                <div className="font-size-sm"><span className="text-muted mr-2">Total units: </span>{props.cart.amount}</div>
            </td>


            <td className="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left" style={{ maxWidth: "10rem" }}>
                <div className="form-group mb-2">
                    <label htmlFor="quantity4">Quantity</label>
                    <input className="form-control form-control-sm"
                        type="number"
                        id="quantity4"
                        value={amountItem}
                        onChange={e => {
                            setAmountItem(e.target.value);
                        }} />
                </div>
                <button className="btn btn-outline-secondary btn-sm btn-block mb-2" type="button" onClick={() => updateProduct(props.cart.id)}>

                    <FiRefreshCw fontSize="25" />{'  '}Update cart</button>
                <button className="btn btn-outline-danger btn-block mb-2" type="button" onClick={() => removeProduct(props.cart.id)}>
                    <FiTrash2 fontSize="25" />{' '}Remove</button>
            </td>
        </tr>)
}




