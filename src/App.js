import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchPage from "./SearchPage";
import Shelf from "./Shelf";

class BooksApp extends React.Component {
    state = {
        books: []
    };

    async componentDidMount() {
        const books = await BooksAPI.getAll();
        this.setState({ books });
    }

    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(books => {
            BooksAPI.getAll().then(books => {
                this.setState(() => ({
                    books
                }));
            });
        });
    };

    render() {
        const shelfs = [
            {
                type: "currentlyReading",
                name: "Currently Reading"
            },
            {
                type: "wantToRead",
                name: "Want To Read"
            },
            {
                type: "read",
                name: "Read"
            }
        ];

        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>

                            {shelfs.map(shelf => (
                                <Shelf
                                    key={shelf.type}
                                    books={this.state.books}
                                    shelftype={shelf.type}
                                    shelfName={shelf.name}
                                    moveBook={this.moveBook}
                                />
                            ))}
                        </div>
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchPage
                            books={this.state.books}
                            moveBook={this.moveBook}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
