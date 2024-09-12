import axios from "axios";

const fetchWikipediaContent = async (title) => {
  const url = "https://en.wikipedia.org/w/api.php";
  const params = {
    action: "parse",
    page: title,
    format: "json",
    prop: "text",
    origin: "*",
  };

  try {
    const response = await axios.get(url, { params });
    const html = response.data.parse.text["*"];
    return html;
  } catch (error) {
    console.error("Error fetching Wikipedia content:", error);
    return null;
  }
};

export default fetchWikipediaContent;
