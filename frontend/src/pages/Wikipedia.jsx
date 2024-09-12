import React from "react";
import { useState, useEffect } from "react";

export default function Wikipedia() {
  const [content, setContent] = useState("");

  const fetchWikipediaPage = async (title) => {
    try {
      const response = await fetch(`api/wiki/${title}`);
      console.log(response);
      const data = await response.json();

      setContent(data.html);
    } catch (error) {
      console.error("Error fetching Wikipedia page:", error);
    }
  };

  useEffect(() => {
    // Example usage: Fetch and display the Wikipedia page for "Albert Einstein"
    fetchWikipediaPage("Albert_Einstein");
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://en.wikipedia.org/w/load.php?debug=false&lang=en&modules=mediawiki.legacy.shared|mediawiki.skinning.content|mediawiki.skinning.interface|skins.vector.styles&only=styles&skin=vector"
      />
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
