import React, { useState } from "react";
import "./App.css";

import Modal from "react-modal";

import { BookToRead } from "./BookToRead";
import BookRow from "./BookRow";
import BookSearchDialog from "./BookSearchDialog";

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    authors: "ダミー",
    memo: "",
  },
  {
    id: 2,
    title: "React Hooks入門",
    authors: "ダミー",
    memo: "",
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    authors: "ダミー",
    memo: "",
  },
];

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

const App = () => {
  const [books, setBooks] = useState(dummyBooks);
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
        <BookSearchDialog maxResults={20} onBookAdd={(b) => {}} />
      </Modal>
    </div>
  );
};

export default App;
