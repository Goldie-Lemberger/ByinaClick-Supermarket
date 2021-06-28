
import React, { useState } from 'react'
import './Item.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'
import ViewDetails from '../viewDetails/ViewDetails'
import addToCart from '../../shared/AddToCart'

import { getProduct } from '../../service/ProductsService'


export default function Item(props) {
    const [shoWBIN, setShoWBIN] = useState(false);

    const handleClose_ = () => {
        setShoWBIN(false);
        props.onsetShow();
    }
    const handleShow_ = () => setShoWBIN(true);

    const PreparingToAddToCart = async () => {
        if (localStorage.getItem('user') === null) {
            handleShow_();
        } else {
            let existedItem = await getProduct(props.id);
            
            addToCart(existedItem);
            props.onUpdateSumCart();
        }
    }
    const [showVD, setShowVD] = useState(false);

    const handleClose = () => {
        setShowVD(false);
       
    }
    const handleShow = () => setShowVD(true);

    return (

        <div className="col btns">
            <div className="card ">
                <img className='mx-auto img-thumbnail size' src={props.imageItem} alt={props.nameItem} width="auto" height="auto" />
                <div className="card-body text-center mx-auto">
                    <div className='cvp'>
                        <div className="">
                            <h6 className="card-title font-weight-bold">{props.nameItem}</h6>
                            <p className="card-title font-weight">{props.informationItem}</p>
                            <p className="card-text">Price: {props.priceItem} LIS</p>
                        </div>
                        <button className="btn btn-block details px-auto" onClick={handleShow}>View Details</button>
                        <br />
                        <button className="btn btn-block cart px-auto" onClick={PreparingToAddToCart}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <Modal show={showVD} onHide={handleClose}>
                <ViewDetails id={props.id} nameItem={props.nameItem}
                    imageItem={props.imageItem}
                    informationItem={props.informationItem}
                    priceItem={props.priceItem}
                    handleClose={handleClose}
                    addToCart={addToCart}
                    onUpdateSumCart={props.onUpdateSumCart} />
            </Modal>
            <Modal show={shoWBIN} onHide={handleClose}>

                <Modal.Body>To add items to the cart, please log in</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_}>
                        Log In
          </Button>

                </Modal.Footer>
            </Modal>
        </div>





    )
}
