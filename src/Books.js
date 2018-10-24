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
        this.props.moveBook(this.props.book, event.target.value);
    };

    render() {
        const { book } = this.props;
        const bookThumnail = book.imageLinks
            ? book.imageLinks.thumbnail
            : "'https://via.placeholder.com/130x175'";

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <img
                            className="book-cover"
                            style={{ width: 128, height: 193 }}
                            src={bookThumnail}
                            alt={book.title}
                        />

                        <div className="book-shelf-changer">
                            <select
                                value={this.state.selectValue}
                                onChange={this.handleSelection}
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
