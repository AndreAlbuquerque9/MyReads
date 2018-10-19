import React, { Component } from "react";
import { Link } from "react-router-dom";
import Books from "./Books";

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        };
    }

    handleChange = event => {
        this.setState({
            query: event.target.value
        });

        if (this.state.query !== "") {
            this.props.searchBook(this.state.query);
        }
    };

    render() {
        const { book, moveBook } = this.props;
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
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.seachedBooks.map(book => (
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
