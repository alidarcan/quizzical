import "./App.css";
import React from "react";
import Question from "./components/question";
import Categories from "./components/categories";

export default function App() {
  const [started, setStarted] = React.useState(false);
  const [category, setCategory] = React.useState("9");
  const [data, setData] = React.useState({});
  const [allCorrectAnswers, setAllCorrectAnswers] = React.useState([]);
  const [allUserAnswers, setAllUserAnswers] = React.useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  React.useEffect(() => {
    if (started) {
      fetch(
        `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=easy&type=multiple`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setAllCorrectAnswers(
            data.results.map((datum) => datum.correct_answer)
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [started, category]);

  function handleClick(questionIndex, answerIndex, event) {
    const text = event.target.innerHTML;
    const newAnswers = allUserAnswers.map((answer, index) => {
      return questionIndex === index ? text : answer;
    });
    setAllUserAnswers(newAnswers);
  }

  function handleChange(event){
    setCategory(event.target.value);
  }

  const main = () => {
    if (!started) {
      return (
        <main className="main">
          <h1 className="title">Quizzical</h1>
          <p className="description">Some description if needed</p>
          <label htmlFor="category-list">Choose a category:</label>
          <select onChange={handleChange} value={category} name="category-list" id="category-list">
            {Categories.map((item, index) =>{
              return (
                <option key={index} value={item.id}>{item.name}</option>
              )
            })}
          </select>
          <button onClick={() => setStarted(true)} className="button-start">
            Start Quiz
          </button>
        </main>
      );
    } else if (started && data.results) {
      return (
        <main>
          <Question
            data={data}
            handleClick={handleClick}
            allCorrectAnswers={allCorrectAnswers}
            allUserAnswers={allUserAnswers}
            resetGame={() => {
              setStarted(false);
            }}
          />
        </main>
      );
    } else {
      return (
        <main>
          <div className="error-description">
            <h1>Loading...</h1>
            <p>
              If you dont see the questions please refresh the page 5 seconds
              later.
            </p>
          </div>
        </main>
      );
    }
  };

  return <>{main()}</>;
}
