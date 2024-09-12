import "./Home.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import jsonAdapter from "axios-jsonp";
import wikiContext from "../../context/wikiContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { setStartingArticle, setEndingArticle } = useContext(wikiContext);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startSearchResults, setStartSearchResults] = useState([]);
  const [endSearchResults, setEndSearchResults] = useState([]);

  const fetchWikipediaTitles = async (searchPrompt) => {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchPrompt}`,
        { adapter: jsonAdapter }
      );
      return response.data[1];
    } catch (error) {
      console.error("Error fetching Wikipedia titles:", error);
      return [];
    }
  };

  const fetchRandomWikipediaArticle = async () => {
    try {
      const response = await axios.get(
        "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1",
        { adapter: jsonAdapter }
      );
      return response.data.query.random[0].title;
    } catch (error) {
      console.error("Error fetching random Wikipedia article:", error);
      return null;
    }
  };

  const handleInputChange = async (e, setPoint, setSearchResults) => {
    const newValue = e.target.value;
    setPoint(newValue);
    if (newValue) {
      const results = await fetchWikipediaTitles(newValue);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (title, setPoint, setSearchResults) => {
    setPoint(title);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStartingArticle(startPoint);
    setEndingArticle(endPoint);
    navigate("/wiki");
  };

  const handleRandomArticle = async (setPoint) => {
    const randomTitle = await fetchRandomWikipediaArticle();
    if (randomTitle) {
      setPoint(randomTitle);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <label>Starting article</label>
        <div className="input-container">
          <input
            type="text"
            value={startPoint}
            onChange={(e) =>
              handleInputChange(e, setStartPoint, setStartSearchResults)
            }
          />
          <button
            type="button"
            onClick={() => handleRandomArticle(setStartPoint)}
          >
            Random
          </button>
          <div className="search-results-wrapper">
            {startSearchResults.map((title, index) => (
              <div
                className="search-result"
                key={index}
                onClick={() =>
                  handleSearchResultClick(
                    title,
                    setStartPoint,
                    setStartSearchResults
                  )
                }
              >
                {title}
              </div>
            ))}
          </div>
        </div>

        <label>Ending article</label>
        <div className="input-container">
          <input
            type="text"
            value={endPoint}
            onChange={(e) =>
              handleInputChange(e, setEndPoint, setEndSearchResults)
            }
          />
          <button
            type="button"
            onClick={() => handleRandomArticle(setEndPoint)}
          >
            Random
          </button>
          <div className="search-results-wrapper">
            {endSearchResults.map((title, index) => (
              <div
                className="search-result"
                key={index}
                onClick={() =>
                  handleSearchResultClick(
                    title,
                    setEndPoint,
                    setEndSearchResults
                  )
                }
              >
                {title}
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Start!</button>
      </form>
    </div>
  );
}
