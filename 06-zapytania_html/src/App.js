import { Component } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList/ArticleList";
import { fetchArticles } from "./components/Services/Api";

//   /* miejscem na odpalenie axiosa jest componentDidMount() {} czyli po stadium render. Wiemy ze jest to fetch i moze potrwac chwile gdyz jest to funkcja asynchroniczna i jest to promise. Dlatego chcemy tutaj zastosowac await. Jesli chcemy zastosowac await to musimy rowniez uzyc async. Czyli nasza metoda musi miec przed soba async.*/

// obsluzymy tez loading przy fetchu

class App extends Component {
  state = {
    articles: [],
    topic: "react",
    isLoading: false,
    error: null,
    page: 0,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { topic, page } = this.state;
    try {
      const response = await fetchArticles(topic, page);
      this.setState({ articles: response, isLoading: false });
    } catch (error) {
      console.log(error);
      this.setState({ error: error });
      throw new Error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleNextPage = () => {
    this.setState(
      {
        page:
          this.state.page === this.state.articles.length
            ? this.state.articles.length
            : this.state.page + 1,
        isLoading: true,
      },
      async () => {
        const response = await fetchArticles(this.state.topic, this.state.page);
        this.setState({ articles: response, isLoading: false });
      }
    );
  };

  handlePreviousPage = () => {
    this.setState(
      {
        page: this.state.page === 0 ? 0 : this.state.page - 1,
        isLoading: true,
      },
      async () => {
        const response = await fetchArticles(this.state.topic, this.state.page);
        this.setState({ articles: response, isLoading: false });
      }
    );
  };

  updateArticles = (topic) => {
    this.setState({ topic: topic, isLoading: true }, async () => {
      const response = await fetchArticles(this.state.topic, this.state.page);
      this.setState({ articles: response, page: 0, isLoading: false });
    });
  };

  render() {
    const { articles, topic, isLoading, error, page } = this.state;
    return (
      <div className="App">
        <h1>Hello</h1>

        <button onClick={() => this.updateArticles("react")}>React</button>
        <button onClick={() => this.updateArticles("css")}>CSS</button>

        {error && <div>Something went wrong :(</div>}
        {isLoading ? (
          <p>Please wait ...</p>
        ) : (
          articles.length > 0 && (
            <ArticleList
              articles={articles}
              topic={topic}
              page={page}
              handleNextPage={this.handleNextPage}
              handlePreviousPage={this.handlePreviousPage}
            />
          )
        )}
      </div>
    );
  }
}

export default App;
