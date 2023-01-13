import axios from "axios";
axios.defaults.baseURL = "http://hn.algolia.com/api/v1";

export const fetchArticles = async (topic, page) => {
  const response = await axios.get(`/search?query=${topic}&page=${page}`);
  //   console.log(page);
  //   console.log(response);
  return response.data.hits;
};
