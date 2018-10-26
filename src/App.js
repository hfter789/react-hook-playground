import React from "react";
import Logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useReducer } from "react";
import QuoteListWithCustomHook from "./QuoteListWithCustomHook";

const countReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return {
        count: state.count + 1
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = { count: 0 };

function App() {
  const [quotes, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(countReducer, initialState);
  const { count } = state;

  function handleAddClick() {
    dispatch({ type: "add" });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Number of quotes ${count}`;
  });
  useEffect(
    () => {
      if (quotes.length < count) {
        setLoading(true);
        fetch("https://breaking-bad-quotes.herokuapp.com/v1/quotes")
          .then(resp => resp.json())
          .then(newQuotes => {
            const quote = newQuotes[0];
            setLoading(false);
            setQuote([...quotes, quote]);
          });
      }
    },
    [count]
  );

  return (
    <>
      <div style={{ margin: 20, display: "flex", flexDirection: "row" }}>
        <div style={{ margin: 20 }}>
          {quotes.map((quote, i) => (
            <div key={i}>
              <p>{quote.quote}</p>
              <p>-- {quote.author}</p>
            </div>
          ))}
          {loading && <img src={Logo} alt="logo" className="App-logo" />}
        </div>
        <QuoteListWithCustomHook count={count} />
      </div>
      <button onClick={handleAddClick}>Add Quote</button>
    </>
  );
}

export default App;
