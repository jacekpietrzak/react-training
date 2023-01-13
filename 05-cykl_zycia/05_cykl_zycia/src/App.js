import { Component } from "react";
import api from "./services/api";
import axios from "axios";
import "./App.css";
import Counter from "./Components/Counter";
import ErrorBoundary from "./Components/ErrorBoundary";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

class App extends Component {
  state = {
    articles: [],
    isLOading: false,
    error: null,
    showCounter: true,
  };

  callWhenReady() {
    console.log("Component Ready!!!");
  }

  // async componentDidMount() {
  //   this.setState({ isLoading: true });
  //   try {
  //     // const response = await axios.get("/search?query=react");
  //     const articles = api("react");
  //     this.setState({ articles: articles });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ error: error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  handleToggleCounter = () => {
    this.setState({
      showCounter: !this.state.showCounter,
    });
  };

  render() {
    const { articles, isLoading, error } = this.state;
    return (
      <div>
        <h1>Hello!</h1>
        {/* {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {articles.length > 0 ? <ArticleList articles={articles} /> : null} */}
        <button onClick={this.handleToggleCounter}>Show / Hide counter</button>
        <div>
          {this.state.showCounter && (
            <ErrorBoundary>
              <Counter callWhenReady={this.callWhenReady} />
            </ErrorBoundary>
          )}
        </div>
      </div>
    );
  }
}

export default App;
