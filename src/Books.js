import React, { Component } from "react";

class Books extends Component {
    state = {
        selectValue: ""
    };

    componentDidMount() {
        this.setState({ selectValue: this.props.book.shelf });
    }

    handleSelection = event => {
        this.setState({ selectValue: event.target.value });
    };
    render() {
        const { book, moveBook } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <img
                            className="book-cover"
                            style={{ width: 128, height: 193 }}
                            src={book.imageLinks.thumbnail}
                            alt={book.title}
                        />

                        <div className="book-shelf-changer">
                            <select
                                value={this.state.selectValue}
                                onChange={this.handleSelection}
                                onClick={() => {
                                    moveBook(book, this.state.selectValue)
                                }}
                            >
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
    }
}
export default Books;
