import React, { createContext, useState, useContext, useEffect } from "react";
import * as BooksAPI from "./BookAPI";

export const BookContext = createContext();
export const useBooks = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookCategories, setBookCategories] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await BooksAPI.getAll();
        setBookCategories({
          currentlyReading: books.filter(
            (book) => book.shelf === "currentlyReading"
          ),
          wantToRead: books.filter((book) => book.shelf === "wantToRead"),
          read: books.filter((book) => book.shelf === "read"),
          none: books.filter((book) => book.shelf === "none"),
        });
      } catch (error) {
        setError(error);
        console.error("Error fetching books: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const updateBookShelf = async (updatedBook, newShelf) => {
    try {
      await BooksAPI.update(updatedBook, newShelf);
      updatedBook.shelf = newShelf;
      setBookCategories((prevState) => {
        const newShelfCategories = { ...prevState };
        for (const shelf in newShelfCategories) {
          newShelfCategories[shelf] = newShelfCategories[shelf].filter(
            (book) => book.id !== updatedBook.id
          );
        }
        if (newShelfCategories[newShelf]) {
          newShelfCategories[newShelf].push(updatedBook);
        }
        return newShelfCategories;
      });
    } catch (error) {
      console.error("Error updating book on server:", error);
    }
  };

  const value = {
    bookCategories,
    updateBookShelf,
    loading,
    error,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
