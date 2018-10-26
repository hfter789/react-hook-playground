import React from "react";
import useQuotes from "./useQuotes";
import Logo from "./logo.svg";

function QuoteListWithCustomHook(props) {
  const { loading, quotes } = useQuotes(props.count);

  return (
    <div style={{ margin: 20 }}>
      {quotes.map((quote, i) => (
        <div key={i}>
          <p>{quote.quote}</p>
          <p>-- {quote.author}</p>
        </div>
      ))}
      {loading && <img src={Logo} alt="logo" className="App-logo" />}
    </div>
  );
}

export default QuoteListWithCustomHook;
