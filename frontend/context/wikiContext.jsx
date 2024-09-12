// context/WikiContext.js
import React, { createContext, useState } from "react";

const wikiContext = createContext();

export function WikiContextProvider({ children }) {
  const [startingArticle, setStartingArticle] = useState("");
  const [endingArticle, setEndingArticle] = useState("");

  return (
    <wikiContext.Provider
      value={{
        startingArticle,
        setStartingArticle,
        endingArticle,
        setEndingArticle,
      }}
    >
      {children}
    </wikiContext.Provider>
  );
}

export default wikiContext;
