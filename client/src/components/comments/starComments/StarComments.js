
import React, { useState, useCallback } from "react";
import StarRatings from "react-star-ratings";
const starRating = props => {
  const [rating, setRating] = useState();
  const changeRating = useCallback(() => {
    setRating(newRating);
  });

  return (
    <div>
      <StarRatings
        rating={rating}
        starRatedColor="gray"
        changeRating={changeRating}
        numberOfStars={6}
        name="rating" />;
    </div>
  )
};

export default starRating;
