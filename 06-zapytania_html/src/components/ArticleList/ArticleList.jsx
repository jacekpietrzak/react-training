import css from "./ArticleList.module.css";

const ArticleList = ({
  articles,
  topic,
  page,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <>
      <h2>
        Articles about <span className={css.topic}>{topic}</span>
      </h2>
      <ul className={css.list}>
        {articles.map((article) => {
          return (
            <li key={article.objectID}>
              <a href={article.url} target="_blank" rel="noreferrer noopener">
                {article.title}
              </a>
            </li>
          );
        })}
      </ul>
      <button name="previousPage" onClick={handlePreviousPage}>
        previous page
      </button>
      <span className={css.pageNumber}>
        {page} of {articles.length}
      </span>
      <button name="nextPage" onClick={handleNextPage}>
        next page
      </button>
    </>
  );
};

export default ArticleList;
