import React, { useState, useEffect } from "react";
import fetchWikipediaContent from "../components/fetchWikipediaContent";

const WikipediaPage = ({ title }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      const html = await fetchWikipediaContent(title);
      setContent(html);
    };
    loadContent();
  }, [title]);

  return (
    <div className="wikipedia-page">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div
        className="wikipedia-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style>{`
        .wikipedia-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Lato', 'Helvetica', 'Arial', sans-serif;
          background-color: #f8f9fa;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        .wikipedia-content {
          max-width: 1000px;
          width: 100%;
          background-color: white;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          border-radius: 4px;
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
