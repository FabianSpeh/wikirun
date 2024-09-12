import "./Home.css";
import React, { useState } from "react";
import axios from "axios";
import jsonAdapter from "axios-jsonp";

export default function Home() {
  const [data, setData] = useState({
    startingPoint: "",
    endPoint: "",
  });

  const [startingArticle, setStartingArticle] = useState("");
  const [endingArticle, setEndingArticle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchWikipediaTitles = async (searchPrompt) => {
    try {
      const data = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchPrompt}`,
        { adapter: jsonAdapter }
      );
      setSearchResults(data.data[1]);
      console.log(data.data[1]);
    } catch (error) {
      console.log(error);
    }
  };

  const setStartPoint = (title) => {
    setStartingArticle(title);
    setData({ ...data, startingPoint: title });
    setSearchResults([]);
  };
  const getStartingPointSearchResults = async (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    setData({ ...data, startingPoint: newValue });
    fetchWikipediaTitles(newValue);
    console.log(newValue);
  };

  const getEndingPointSearchResults = async (e) => {
    e.preventDefault();
    setData({ ...data, startingPoint: e.target.value });
    const { startingPoint, endingPoint } = data;
  };

  return (
    <div className="wrapper">
      <form>
        <label>Starting article</label>
        <div className="input-container">
          <input
            type="text"
            name="startingArticle"
            value={data.startingPoint}
            onChange={getStartingPointSearchResults}
          />
          <div className="search-results-wrapper">
            {searchResults &&
              searchResults.map((title, index) => (
                <div
                  className="search-result"
                  key={index}
                  onClick={() => setStartPoint(title)}
                >
                  {title}
                </div>
              ))}
          </div>
        </div>

        <label>Ending article</label>
        <input
          type="text"
          name="endingArticle"
          value={data.endingPoint}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Start!</button>
      </form>
    </div>
  );
}
