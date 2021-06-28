import React, { useState } from 'react';
import './FinalPayment.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { isValide } from '../../shared/regex';
import { updateCart } from '../../service/CartService';
import { invoicing } from '../../service/invoicingService'
import successShop from '../../asset/successShop.png'
const PaymentForm = (props) => {
  const [showDownloadDO, setShowDownloadDO] = useState(false);
  const [cc, setCc] = useState({
    cvc: { name: '', message: '', proper: false },
    expiry: { name: '', message: '', proper: false },
    number: { name: '', message: '', proper: false },
    name: { name: '', message: '', proper: false }
  });
  const [focus, setFocus] = useState('')


  const UpdateValue = (updateValue) => {
    const message_ = isValide(updateValue.target);
    if (message_ === "") {
      setCc({
        ...cc,
        [updateValue.target.name]: { name: updateValue.target.value, message: "", proper: updateValue.target.value === "" ? false : true }
      })
    } else {
      if (updateValue.target.value !== "") {
        setCc({
          ...cc,
          [updateValue.target.name]: { name: updateValue.target.value, message: message_, proper: false }
        })
      }
    }
  }

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const submitPay = async (event) => {
    event.preventDefault();
    let newDataToUpdate = cc
    let checkFormIsCorrect = true;
    Object.keys(newDataToUpdate).forEach((value_) => {
      if (newDataToUpdate[value_].name === "") {
        newDataToUpdate[value_].message = "is required!";
      }
      checkFormIsCorrect &= cc[value_].proper;
    })
    setCc({ ...newDataToUpdate });

    if (checkFormIsCorrect) {
      setShowDownloadDO(true);
      const check = await invoicing({
        items: JSON.parse(localStorage.cart),
        lastName: JSON.parse(localStorage.user).lastName,
        firstName: JSON.parse(localStorage.user).firstName,
        address: JSON.parse(localStorage.user).address,
        email: JSON.parse(localStorage.user).userEmail,
        total: props.total
      });
      const clearCart = { id: JSON.parse(localStorage.cart).id, cart: [], totalPrice: JSON.parse(localStorage.user).type === "BusinessCustomer" ? 20 : 50 }
      await updateCart(clearCart)
      await localStorage.setItem('cart', JSON.stringify(clearCart));
      await props.onUpdateSumCart();
    }
  }

  return (
    <div id="PaymentForm" className=" container container_ ">
      {!showDownloadDO && <div className="row"><div className="  col-5">
        <form className="row g-3" onSubmit={submitPay}>
          <div>
            <input type="tel" name="number" id="number"
              className="form-control_ login-input"
              placeholder="Card Number"
              value={cc.number.name}
              onChange={UpdateValue}
              onFocus={handleInputFocus} />
            <small className="smallErorr">{cc.number.message}</small></div>
          <div>
            <input type="tel" name="name" id="name"
              className="form-control_ login-input"
              placeholder="name"
              value={cc.name.name}

              onChange={UpdateValue}

              onFocus={handleInputFocus} />
            <small className="smallErorr">{cc.name.message}</small></div>
          <div>
            <input type="tel" name="expiry"
              className="form-control_ login-input"
              placeholder="expiry" id="expiry"
              value={cc.expiry.name}

              onChange={UpdateValue}
              onFocus={handleInputFocus} />
            <small className="smallErorr">{cc.expiry.message}</small></div>
          <div>
            <input type="tel" name="cvc"
              className="form-control_ login-input"
              placeholder="cvc"
              value={cc.cvc.name} id="cvc"
              onChange={UpdateValue}
              onFocus={handleInputFocus} />
            <small className="smallErorr">{cc.cvc.message}</small></div>
          <div className="col-12">
            <button type="submit" className="btn btn-dark btn-center" >Submit</button>
          </div>
        </form>

      </div>

        <div className=" col-6">
          <Cards cvc={cc.cvc.name} expiry={cc.expiry.name} focused={focus} name={cc.name.name} number={cc.number.name} />
        </div>


      </div>
      }

      {showDownloadDO && <div className="row">
       
        <img className="col-7" src={successShop}></img>
        <div className="col-5">  <br/><br/><br/>  <p ><b>Thank you for buying from us</b></p>
          <p >A transaction invoice was sent by email</p></div>


      </div>
      }
      <p className="total-price">Total: {(JSON.parse(localStorage.cart).totalPrice).toFixed(2)}</p>

    </div>);
};

export default PaymentForm;