import { useState, useEffect } from "react";

function useQuotes(numOfQuotes) {
  const [quotes, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (quotes.length < numOfQuotes) {
        setLoading(true);
        fetch(
          `https://breaking-bad-quotes.herokuapp.com/v1/quotes/${numOfQuotes}`
        )
          .then(resp => resp.json())
          .then(quotes => {
            setLoading(false);
            setQuote(quotes);
          });
      }
    },
    [numOfQuotes]
  );

  return { quotes, loading };
}

export default useQuotes;
