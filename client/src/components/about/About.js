import React from 'react'
import './About.css'
import Modal from 'react-bootstrap/Modal'
export default function About() {

    return (
        <div>
            <Modal.Header >
                <Modal.Title id="example-custom-modal-styling-title">
                    Terms and conditions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="test1 text-md-start">
                    <b>Terms and Conditions - updated 15/04/2021</b>
                    <br />
                  Orders must be placed by 4pm the day before delivery.
                  Cancellations can only be accepted if made by 5pm the day before delivery
                  Deliveries will be made between 10:00am and 12:30pm unless previously agreed Occasionally
                  due to seasonal variation or availability we may have to substitute certain items with items of a
                   similar or higher value Payment terms are strictly 14 days Late payments will be subject to
                   collection fees and interest as prescribed by the Late Payment of Commercial Debts Act 2002
                <br />
                In these Terms and Conditions<b> "Buy in a Click" </b>means Kincaid 1875 Limited t/a Trenchers and
                “the Client” means the person or company booking the event.
                <br />
                    <b>Deposit</b>
                    <br />
                No Deposit is needed on booking as all bookings are on an invoice basis,
                with our standard 14 day terms.
                <br />
                    <b>Cancellation</b>
                    <br />
                If booking is cancelled before 3pm the day before,
                no charge will be made, however, if the orders is cancelled on the day of the booking,
                 full invoice amount will be charged.
                 <br />
                    <b>Delivery</b>
                    <br />
                Any time or date stated by the Company for the delivery or removal of goods required in the provision of
                services is an estimate only and shall not be an essential term of the contract. Delivery and collection
                will be attempted to all reasonable areas at the venue or facility. However should the access be restricted
                or additional time, personnel or facilities required, any additional costs will b passed on to the client.
                </p>
            </Modal.Body>
        </div>
    );
}






