import React from "react";
import Bookshelf from "../components/Bookshelf";
import Navbar from "../components/Navbar";
import { useBooks } from "../BookContext";
import Footer from "../components/Footer";

function Library() {
  const { bookCategories, updateBookShelf } = useBooks();

  return (
    <>
      <div>
        <Navbar />
        <div>
          <div>
            <div>
              <Bookshelf
                books={bookCategories.currentlyReading}
                shelfTitle="Currently Reading"
                updateBookShelf={updateBookShelf}
              />
              <Bookshelf
                books={bookCategories.wantToRead}
                shelfTitle="Want to Read"
                updateBookShelf={updateBookShelf}
              />
              <Bookshelf
                books={bookCategories.read}
                shelfTitle="Read"
                updateBookShelf={updateBookShelf}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Library;
