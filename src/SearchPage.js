import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import Books from "./Books";
import * as BooksAPI from "./BooksAPI";

class SearchPage extends Component {
    state = {
        query: "",
        searchedBooks: []
    };

    updateQuery = query => {
        this.setState(() => ({
            query: query
        }));

        if (query !== "") {
            this.props.searchBook(this.state.query);
        } else {
            this.props.clearResults();
        }
    };

    searchBook = query => {
        BooksAPI.search(query).then(searchedBooks => {
            if (searchedBooks.error === "empty query") {
                this.clearResults();
            } else {
                searchedBooks = searchedBooks.map(book => {
                    let bookInShelf = this.inShelf(book, this.state.books);

                    if (bookInShelf === undefined) {
                        book.shelf = "none";
                        return book;
                    } else {
                        return bookInShelf;
                    }
                });

                this.setState(() => ({
                    searchedBooks
                }));
            }
        });
    };

    inShelf = (book, shelf) => {
        let inTheShelf;

        shelf.forEach(bookToCheck => {
            if (bookToCheck.id === book.id) {
                inTheShelf = bookToCheck;
            }
        });

        return inTheShelf;
    };

    clearResults = () => {
        this.setState({ searchedBooks: [] });
    };

    render() {
        const { moveBook } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                        onClick={this.clearResults}
                    >
                        Close
                    </Link>

                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            type="text"
                            placeholder="Search by title or author"
                            debounceTimeout={300}
                            value={this.state.query}
                            onChange={event =>
                                this.updateQuery(event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.map(book => (
                            <Books
                                key={book.id}
                                book={book}
                                moveBook={moveBook}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;
