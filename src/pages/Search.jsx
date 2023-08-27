import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../components/Navbar";
import { Menu, Transition } from "@headlessui/react";
import { BsFillJournalBookmarkFill, BsSearch } from "react-icons/bs";
import * as BooksAPI from "../BookAPI";
import { useBooks } from "../BookContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const statuses = {
  currentlyReading: "text-blue-700 bg-blue-50 ring-blue-400/20",
  wantToRead: "text-cyan-700 bg-cyan-50 ring-cryan-400/10",
  read: "text-green-700 bg-green-50 ring-green-400/20",
  none: "text-gray-900 bg-blue-200/20 ring-blue-700/20",
};

const supportedSearchTerms = [
  "Android",
  "Art",
  "Artificial Intelligence",
  "Astronomy",
  "Austen",
  "Baseball",
  "Basketball",
  "Bhagat",
  "Biography",
  "Brief",
  "Business",
  "Camus",
  "Cervantes",
  "Christie",
  "Classics",
  "Comics",
  "Cook",
  "Cricket",
  "Cycling",
  "Desai",
  "Design",
  "Development",
  "Digital Marketing",
  "Drama",
  "Drawing",
  "Dumas",
  "Education",
  "Everything",
  "Fantasy",
  "Film",
  "Finance",
  "First",
  "Fitness",
  "Football",
  "Future",
  "Games",
  "Gandhi",
  "Homer",
  "Horror",
  "Hugo",
  "Ibsen",
  "Journey",
  "Kafka",
  "King",
  "Lahiri",
  "Larsson",
  "Learn",
  "Literary Fiction",
  "Make",
  "Manage",
  "Marquez",
  "Money",
  "Mystery",
  "Negotiate",
  "Painting",
  "Philosophy",
  "Photography",
  "Poetry",
  "Production",
  "Programming",
  "React",
  "Redux",
  "River",
  "Robotics",
  "Rowling",
  "Satire",
  "Science Fiction",
  "Shakespeare",
  "Singh",
  "Swimming",
  "Tale",
  "Thrun",
  "Time",
  "Tolstoy",
  "Travel",
  "Ultimate",
  "Virtual Reality",
  "Web Development",
  "iOS",
];

function getDisplayShelfTitle(shelfTitle) {
  switch (shelfTitle) {
    case "currentlyReading":
      return "Currently Reading";
    case "wantToRead":
      return "Want to Read";
    case "read":
      return "Read";
    default:
      return "None";
  }
}

function Search() {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { updateBookShelf } = useBooks();
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        const allBooks = await BooksAPI.getAll();
        setAllBooks(allBooks);
        setFilteredBooks(allBooks);
      } catch (error) {
        console.error("Debug: Error fetching all books:", error);
        setFilteredBooks([]);
      }
    };
    fetchInitialBooks();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredBooks([]);
      return;
    }

    const trimmedQuery = query.trim();

    try {
      BooksAPI.search(trimmedQuery).then((results) => {
        if (!results.error) {
          const filteredResults = results.filter((book) =>
            book.title.toLowerCase().includes(trimmedQuery.toLowerCase())
          );
          setFilteredBooks(filteredResults);
        } else {
          setFilteredBooks([]);
        }
      });
    } catch (error) {
      console.error("Debug: Error performing search:", error);
      setFilteredBooks([]);
    }
  }, [query, allBooks]);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Explore Our Comprehensive Book Catalog
            </h2>
            <p className="mt-4 text-gray-500 max-w-4xl">
              Navigate through an extensive collection of literary works to
              curate your personal reading journey.
            </p>
            <div>
              <div className="mt-8 mb-2">
                <label
                  htmlFor="bookSearch"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Search by Book Title
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <BsSearch
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="bookSearch"
                    id="bookSearch"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="Enter Book Title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul role="list" className="divide-y divide-gray-100">
          {(filteredBooks?.length ?? 0) > 0 ? (
            filteredBooks.map((book) => (
              <li key={book.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div
                    className="flex-none bg-gray-50"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundImage: `url("${
                        book.imageLinks &&
                        book.imageLinks.thumbnail.replace("http://", "https://")
                      }")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "6px",
                    }}
                  ></div>
                  <div className="min-w-0 flex-auto">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {book?.title}
                      </p>
                      <p
                        className={classNames(
                          statuses[book.shelf],
                          "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        {getDisplayShelfTitle(book.shelf)}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                        Authors: {book.authors && book.authors.join(", ")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="flex items-center rounded-full bg-gray-200 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-200">
                      <span className="sr-only">Change Shelf</span>
                      <span className="px-2 py-1">
                        <BsFillJournalBookmarkFill />
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                updateBookShelf(book, "currentlyReading")
                              }
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                              )}
                            >
                              Currently Reading
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                updateBookShelf(book, "wantToRead")
                              }
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                              )}
                            >
                              Want to Read
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => updateBookShelf(book, "read")}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                              )}
                            >
                              Read
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => updateBookShelf(book, "none")}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                              )}
                            >
                              None
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center mt-4 text-lg text-gray-600">
              <p>
                Sorry, we couldn't find any results for your query. Please note
                that the search is limited to a particular set of terms as per
                the backend API. Supported search terms include but are not
                limited to: {supportedSearchTerms.slice(0, 3).join(", ")}, etc.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Complete list of supported terms:{" "}
                {supportedSearchTerms.join(", ")}
              </p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Search;
