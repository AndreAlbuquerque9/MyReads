import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import Books from "./Books";

class SearchPage extends Component {
    state = {
        query: ""
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

    render() {
        const { moveBook, searchedBooks } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                        onClick={this.props.clearResults}
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
                        {searchedBooks.map(book => (
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
