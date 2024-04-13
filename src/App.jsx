import "./App.css";
import React from "react";
import Question from "./components/question";

export default function App() {
  const [started, setStarted] = React.useState(false);
  const main = () => {
    if (!started) {
      return (
        <main className="main">
          <h1 className="title">Quizzical</h1>
          <p className="description">Some description if needed</p>
          <button onClick={() => setStarted(true)} className="button-start">
            Start Quiz
          </button>
        </main>
      );
    } else if (started) {
      return (
        <main>
          <Question value={1} />
          <Question value={2}/>
          <Question value={3}/>
          <Question value={4}/>
          <Question value={5}/>
          <button className="button-check">Check Answers</button>
        </main>
      );
    }
  };
  return (
    <>
      {main()}
    </>
  );
}
