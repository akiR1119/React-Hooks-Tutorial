import React, { useState, useEffect } from "react";
import "./App.css";

import Modal from "react-modal";

import { BookToRead } from "./BookToRead";
import BookRow from "./BookRow";
import BookSearchDialog from "./BookSearchDialog";
import { BookDescription } from "./BookDescription";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const APP_KEY = "react-hooks-tutrial";

const App = () => {
  const [books, setBooks] = useState([] as BookToRead[]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const bookrows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id, memo) => handleBookMemoChange(id, memo)}
        onDelete={(id) => handleBookDelete(id)}
      />
    );
  });

  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id);
    setBooks(newBooks);
  };

  const handleBookAdd = (book: BookDescription) => {
    console.log("handleBookAdd");
    const newBook: BookToRead = { ...book, id: Date.now(), memo: "" };
    const newBooks = [...books, newBook];
    setBooks(newBooks);
    setModalIsOpen(false);
  };

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id === id ? { ...b, memo: memo } : b;
    });
    setBooks(newBooks);
  };

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const storedBooks = localStorage.getItem(APP_KEY);
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(books));
  }, [books]);

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>
          本を追加
        </div>
      </section>
      <section className="main">{bookrows}</section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog
          maxResults={20}
          onBookAdd={(b) => {
            handleBookAdd(b);
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
