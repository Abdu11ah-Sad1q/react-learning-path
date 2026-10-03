import { useState } from "react";
import questions from "./data/questions";

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(index) {
    // answer cannot be changed once chosen
    if (selected !== null) return;

    setSelected(index);
    if (index === question.answer) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (current + 1 === questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function getOptionClass(index) {
    let classes = "block w-full text-left border rounded p-2 mb-2 ";

    if (selected === null) {
      return classes + "border-gray-400 hover:bg-gray-100";
    }
    if (index === question.answer) {
      return classes + "bg-green-300 border-green-600";
    }
    if (index === selected) {
      return classes + "bg-red-300 border-red-600";
    }
    return classes + "border-gray-300 text-gray-400";
  }

  if (finished) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Quiz finished</h2>
        <p className="mb-4">
          Your score: {score} / {questions.length}
        </p>
        <button
          onClick={handleRestart}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2">
        Question {current + 1} of {questions.length}
      </p>

      <h2 className="text-xl font-bold mb-4">{question.question}</h2>

      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          className={getOptionClass(index)}
        >
          {option}
        </button>
      ))}

      {selected !== null && (
        <p className="mb-4">
          {selected === question.answer
            ? "Correct!"
            : "Wrong! The correct answer is: " +
              question.options[question.answer]}
        </p>
      )}

      <button
        onClick={handleNext}
        disabled={selected === null}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}

export default Quiz;