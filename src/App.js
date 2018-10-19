import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchPage from "./SearchPage";
import Shelf from "./Shelf";

class BooksApp extends React.Component {
    state = {
        books: [],
        seachedBooks: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState(() => ({
                books
            }));
        });
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

    searchBook = query => {
        BooksAPI.search(query).then(seachedBooks => {
            seachedBooks = seachedBooks.map(book => {
                let bookInShelf = this.inShelf(book, this.state.books);

                if (bookInShelf === undefined) {
                    book.shelf = "none";
                    return book;
                } else {
                    return bookInShelf;
                }
            });

            this.setState(() => ({
                seachedBooks
            }));
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

    render() {
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
                            <Shelf
                                books={this.state.books}
                                shelftype={"currentlyReading"}
                                shelfName={"Currently Reading"}
                                moveBook={this.moveBook}
                            />

                            <Shelf
                                books={this.state.books}
                                shelftype={"wantToRead"}
                                shelfName={"Want To Read"}
                                moveBook={this.moveBook}
                            />

                            <Shelf
                                books={this.state.books}
                                shelftype={"read"}
                                shelfName={"Read"}
                                moveBook={this.moveBook}
                            />
                        </div>
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchPage
                            searchBook={this.searchBook}
                            moveBook={this.moveBook}
                            seachedBooks={this.state.seachedBooks}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
