import { useState } from "react";

const labels = {
  1: "Terrible",
  2: "Bad",
  3: "OK",
  4: "Good",
  5: "Great",
};

const StarRating = (props) => {
  const {title} = props;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  function handleClick(star) {
    if (star === rating) {
      setRating(0);
    } else {
      setRating(star);
    }
  }

  // show hover if hovering, otherwise show the chosen rating
  const shown = hover || rating;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold">{title}</h2>

      <div onMouseLeave={() => setHover(0)}>
        {stars.map((star) => (
          <span
            key={star}
            onMouseEnter={() => setHover(star)}
            onClick={() => handleClick(star)}
            className={
              star <= shown
                ? "text-4xl cursor-pointer text-yellow-400"
                : "text-4xl cursor-pointer text-gray-300"
            }
          >
            ★
          </span>
        ))}
      </div>

      <p>{labels[rating] || "Not rated"}</p>
    </div>
  );
}

export default StarRating;