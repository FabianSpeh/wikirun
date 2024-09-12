import React, { useState, useEffect, useContext, useCallback } from "react";
import fetchWikipediaContent from "../components/fetchWikipediaContent";
import wikiContext from "../../context/wikiContext";

const WikipediaPage = ({ title }) => {
  const { startingArticle, endingArticle } = useContext(wikiContext);

  const [content, setContent] = useState("");
  const [currentArticle, setCurrentArticle] = useState(startingArticle);
  const loadContent = useCallback(async (article) => {
    const html = await fetchWikipediaContent(article);
    setContent(html);
  }, []);
  useEffect(() => {
    loadContent(currentArticle);
    if (currentArticle == endingArticle.replace(/ /g, "_")) {
      console.log("You won!!");
    }
  }, [currentArticle, loadContent]);

  const handleLinkClick = useCallback((event) => {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    if (href && href.startsWith("/wiki/")) {
      const newArticle = decodeURIComponent(href.split("/wiki/")[1]);
      setCurrentArticle(newArticle);
      const page = document.querySelector(".wikipedia-page");
      page.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    const content = document.querySelector(".wikipedia-content");

    if (content) {
      content.addEventListener("click", handleLinkClick);

      return () => content.removeEventListener("click", handleLinkClick);
    }
  }, [handleLinkClick]);

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="title-container">
          {startingArticle} > {endingArticle}
        </div>
        <div className="click-history"></div>
      </div>
      <div className="wikipedia-page">
        {/* <h1 className="text-3xl font-bold mb-4">{title}</h1>*/}
        <div
          className="wikipedia-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <style>{`
       .wrapper {
          display:flex;
          flex-direction: row;
          width: 100%;
          height:100vh;
        }

        .click-history {
        background-color: lightgray;
        width:25%;
        height:100%;
        display: flex;
        justify-content: center;
              }
        .wikipedia-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Lato', 'Helvetica', 'Arial', sans-serif;
          background-color: #f8f9fa;
          min-height: 100%;
          max-height: 100%;
          width: 75%;
          display: flex;
          justify-content: center;
          overflow: scroll;
          scrollbar-color: blue;
          scrollbar-width: thin;
          
         
        }
        .wikipedia-content {
          
          width: 100%;
          background-color: white;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          
        }
        .wikipedia-content h1, .wikipedia-content h2, .wikipedia-content h3, .wikipedia-content h4, .wikipedia-content h5, .wikipedia-content h6 {
          border-bottom: 1px solid #a2a9b1;
          padding-bottom: 0.25em;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .wikipedia-content p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          line-height: 1.6;
        }
        .wikipedia-content a {
          color: #0645ad;
          text-decoration: none;
        }
        .wikipedia-content a:hover {
          text-decoration: underline;
        }
        .wikipedia-content img {
          max-width: 100%;
          height: auto;
        }
        .wikipedia-content table {
          border-collapse: collapse;
          margin: 1em 0;
        }
        .wikipedia-content th, .wikipedia-content td {
          border: 1px solid #a2a9b1;
          padding: 0.5em;
        }
        .error-message {
          color: red;
          text-align: center;
          font-size: 1.2em;
          margin-top: 2em;
        }
      `}</style>
    </div>
  );
};

export default WikipediaPage;
