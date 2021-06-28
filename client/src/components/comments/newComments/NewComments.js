import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalBody, ModalFooter } from "react-bootstrap";
import "./NewComments.css";
import StarRatings from "react-star-ratings";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from 'emoji-mart';
import { GrEmoji } from 'react-icons/gr'

export default function NewResponse(props) {
  const [rating, setRating] = useState(4);
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [message, SetMessage] = useState("");

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={emoji => SetMessage(message + emoji.native)}
      />
    );
  }

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  const addNewResponse = () => {
    props.addNewResponse(message, rating);
    SetEmojiPicker(false);
    SetMessage("");
    props.handleClose();
  }
  return (
    <div>
      {localStorage.getItem('user') !== null && (
        <Modal show={props.show} onHide={props.handleClose} aria-labelledby="example-modal-sizes-title-lg" >
          <ModalBody>
            <div className="stars">
              <StarRatings
                changeRating={(rate) => {
                  setRating(rate);
                }}
                rating={rating}
                starEmptyColor="black"
                starRatedColor="#f3cb16"
                starHoverColor="#f3cb16"
                starDimension="45px"
              />
            </div>


            <div className="measure newResponse-text">
              <label htmlFor="name" className="form-label_ ">Your Comment:</label>
              <input
                id="name"
                className="form-control_ "
                type="text"
                aria-describedby="name-desc"
                value={message}
                onChange={event => SetMessage(event.target.value)}
              />

              <button className="btn-style" onClick={triggerPicker}><GrEmoji /> </button>
              {emojiPicker}
            </div>
          </ModalBody>
          <ModalFooter>
            <div
              className="secondary"
              onClick={addNewResponse}
            >
              Rate!
            </div>
          </ModalFooter>
        </Modal>
      )}
      {(localStorage.getItem('user') === null) && (
        <Modal show={props.show} onHide={props.handleClose}>
          <ModalBody>
            <div className="text">You can not respond without logging in,<br />Please log in to rate</div>
          </ModalBody>

        </Modal>
      )}
    </div>
  );
}
