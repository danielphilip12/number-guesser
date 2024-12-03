import React, { useEffect, useState } from "react";
import "./Numbers.css";

const Numbers = () => {
  const [numbers, setNumbers] = useState([]);
  const [target, setTarget] = useState();
  const [message, setMessage] = useState("Click a number");
  const [upper, setUpper] = useState(20);

  useEffect(() => {
    const num = [];
    for (let i = 1; i <= upper; i++) {
      num.push(i);
    }

    const randomNumber = Math.floor(Math.random() * upper) + 1;

    setNumbers(num);
    setTarget(randomNumber);
  }, [upper]);

  const markLow = (guess) => {
    const numberElements = document.querySelectorAll(".Number");
    numberElements.forEach((element) => {
        if (parseInt(element.innerHTML) <= guess) {
            element.style.backgroundColor = "red";
            element.style.textDecoration = 'line-through';
        } 
      
    });
  }

  const markHigh = (guess) => {
    const numberElements = document.querySelectorAll(".Number");
    numberElements.forEach((element) => {
        if (parseInt(element.innerHTML) >= guess) {
            element.style.backgroundColor = "red";
            element.style.textDecoration = 'line-through';
        } 
      
    });
  }

  const handleClick = (e) => {
    if(message === "Correct") {
      return;
    }
    const guess = parseInt(e.target.innerHTML);
    if (guess === target) {
      setMessage("Correct");
      e.target.style.backgroundColor = "Green";
    } else if (guess < target) {
      setMessage("Too Low");
      markLow(guess);
    } else if (guess > target) {
      setMessage("Too High");
      markHigh(guess);
    } else {
      setMessage("Error");
    }
  };

  const handlePlayAgain = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;

    setTarget(randomNumber);
    setMessage("Click a number");
    const numberElements = document.querySelectorAll(".Number");
    numberElements.forEach((element) => {
      element.style.backgroundColor = ""; // Reset background color
      element.style.color = ""; // Reset text color if needed
      element.style.textDecoration = ""; 
    });
  };
  return (
    <div className="Numbers">
    <input type="number" name="upper" id="upper" value={upper} onChange={e => setUpper(parseInt(e.target.value))} />
      <div className="Numbers-numbers">
        {numbers &&
          numbers.map((i) => {
            return (
              <p key={i} className="Number" onClick={handleClick}>
                {i}
              </p>
            );
          })}
      </div>
      <p>{message}</p>
      {message === "Correct" && (
        <button onClick={handlePlayAgain}>Play again?</button>
      )}
    </div>
  );
};

export default Numbers;
