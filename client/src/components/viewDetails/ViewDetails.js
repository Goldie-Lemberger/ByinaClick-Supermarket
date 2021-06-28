import React from 'react';
import './ViewDetails.css';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getProduct } from '../../service/ProductsService'

export default function ViewDetails(props) {

  const PreparingToAddToCart = async () => {
    let existedItem = await getProduct(props.id);
    props.addToCart(existedItem);
    props.onUpdateSumCart();
  }
  return (
    <div>
      <Modal.Header >
        <Modal.Title> <p>name: <b>{props.nameItem}</b></p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <td>    
                <img src={props.imageItem} alt={props.nameItem} />
          </td>
          <td>
            <tr>information: {props.informationItem}</tr>
            <tr>   <b>Price: </b>{props.priceItem} ILS</tr>
          </td>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-dark btn-outline-danger" onClick={props.handleClose}>
          Close
          </Button>
        <Button className="btn btn-dark btn-outline-success" onClick={() => {
          props.handleClose();
          PreparingToAddToCart();
        }}>
          Add To Cart
          </Button>
      </Modal.Footer>
      <ToastContainer />
    </div>)
}