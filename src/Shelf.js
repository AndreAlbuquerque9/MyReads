import { Link } from "react-router-dom";
import Books from "./Books";

function Shelf(props) {
    const { books, shelftype, shelfName, moveBook } = props;
    return (
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(
                            book =>
                                shelftype === book.shelf ? (
                                    <Books
                                        key={book.id}
                                        book={book}
                                        moveBook={moveBook}
                                    />
                                ) : (
                                    ""
                                )
                        )}
                    </ol>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Search Book</Link>
            </div>
        </div>
    );
}

export default Shelf;
