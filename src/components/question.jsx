import PropTypes from "prop-types";
import React from "react";
import he from "he";

function shuffleArray(answers) {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
}

export default function Question(props) {
  const { data, handleClick, allCorrectAnswers, allUserAnswers, resetGame } =
    props;
  const [questions, setQuestions] = React.useState([]);
  const [isCheckTime, setIsCheckTime] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);

  React.useEffect(() => {
    const shuffledQuestions = data.results.map((datum) => {
      const question = he.decode(datum.question);
      const answers = [datum.correct_answer, ...datum.incorrect_answers];
      const shuffledAnswers = shuffleArray(answers);
      return {
        question,
        answers: shuffledAnswers,
        correct_answer: datum.correct_answer,
      };
    });
    setQuestions(shuffledQuestions);
  }, [data.results]);

  function checkAnswers() {
    if (allUserAnswers.every((item) => item.length > 0)) {
      if (isCheckTime) {
        resetGame();
      }
      let count = 0;
      for (let i = 0; i < allCorrectAnswers.length; i++) {
        if (allCorrectAnswers[i] === allUserAnswers[i]) {
          count++;
        }
      }
      setCorrectCount(count);
      setIsCheckTime((prevValue) => !prevValue);
    // } else{
    //     const errorMessage =()=>{ <p>Hello there</p>}
    //     return errorMessage
    }
  }

  return (
    <>
      {questions.map((questionData, index) => (
        <div key={index}>
          <h2 className="question">
            Question {index + 1}: {questionData.question}
          </h2>
          <div className="input-group">
            {questionData.answers.map((answer, ind) => (
              <div key={`Question${index}Answer${ind}`}>
                <input
                  disabled={isCheckTime}
                  type="radio"
                  name={`question${index + 1}`}
                  id={`question${index + 1}answer${ind + 1}`}
                  value={answer}
                />
                <label
                  onClick={
                    !isCheckTime ? ((event) => handleClick(index, ind, event)): undefined
                  }
                  className={`question${index + 1}`}
                  htmlFor={`question${index + 1}answer${ind + 1}`}
                  style={
                    isCheckTime &&
                    allUserAnswers[index] !== allCorrectAnswers[index] &&
                    answer === allCorrectAnswers[index]
                      ? { backgroundColor: "#F8BCBC", border: "none" }
                      : isCheckTime && answer === allCorrectAnswers[index]
                      ? { backgroundColor: "#94D7A2", border: "none" }
                      : {}
                  }
                >
                  {answer}
                </label>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
      <div className="endGame-credits">
        {isCheckTime && <p>You have answered {correctCount}/5 correctly.</p>}
        <button onClick={checkAnswers} className="button-check">
          {isCheckTime ? "New Game" : "Check Answers"}
        </button>
      </div>
    </>
  );
}
Question.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
  checkAnswers: PropTypes.func,
  allCorrectAnswers: PropTypes.array,
  allUserAnswers: PropTypes.array,
  resetGame: PropTypes.func,
};
