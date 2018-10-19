import React, { Component } from "react";
import { Link } from "react-router-dom";
import Books from "./Books";

class SearchPage extends Component {
    state = {
        query: ""
    };

    updateQuery = query => {
        this.setState(() => ({
            query: query
        }));

        if (this.state.query !== "") {
            this.props.searchBook(this.state.query);
        } else {
            this.props.clearResults();
        }
    };

    render() {
        const { moveBook } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={event =>
                                this.updateQuery(event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchedBooks.map(book => (
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
