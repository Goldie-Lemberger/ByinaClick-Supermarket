import React from "react";
import "./Comment.css";
import StarRatings from "react-star-ratings";
import { GoThumbsup } from 'react-icons/go'
import { FaUserAlt } from 'react-icons/fa'


export default function Comment(props) {
  return (
    <div className="respnse-contaner">
      <div className="col">
        <div className="card ">
          <div className="card-body text-center mx-auto">
            <div className='cvp'>
              <div className="">
                <div className="respnse-name card-title font-weight-bold">
                  <p className="response-userIcon">
                    <FaUserAlt className="iconThumbsUp" />
                  </p>
                  {"  "}  {props.name}
                </div>
                <div className="card-title font-weight">
                  <div className="response-response">
                    <div className="response-responseIcon">

                      <GoThumbsup className="iconThumbsUp" />
                    </div>
                    {" "} {props.response}
                  </div>
                </div>
              </div>
        
              <StarRatings
                rating={props.rating}
                starEmptyColor="black"
                starRatedColor="#eef134"
                starEmptyColor="gray"
                starHoverColor="#f3cb16"
                starDimension="1.5vw"
                starSpacing="0.25vw"
              />
              <small>{props.time}</small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
