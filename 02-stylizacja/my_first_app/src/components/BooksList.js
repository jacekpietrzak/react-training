const BooksList = ({ books }) => {
  return (
    <>
      {books && (
        <ul className="BooksList">
          {books.map((book) => {
            return (
              <li key={book.id} className="BooksList__item">
                {book.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default BooksList;
