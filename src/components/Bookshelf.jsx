import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Bookshelf({ books, shelfTitle, updateBookShelf }) {
  const getBookTitle = () => {
    if (shelfTitle === "Currently Reading") {
      return "Currently Engaging Reads";
    } else if (shelfTitle === "Want to Read") {
      return "Upcoming Literary Adventures";
    } else if (shelfTitle === "Read") {
      return "Completed Journeys";
    } else {
      return "General Shelf";
    }
  };
  console.log("Current shelfTitle:", shelfTitle);

  const getBookDescription = () => {
    if (shelfTitle === "Currently Reading") {
      return "Dive back into your current reads. Perfect for picking up right where you left off.";
    } else if (shelfTitle === "Want to Read") {
      return "Your curated list of future reads. Excitement and anticipation build with each addition.";
    } else if (shelfTitle === "Read") {
      return "Reflect on the stories you've completed. A legacy of learned lessons and memorable moments.";
    } else {
      return "Your catch-all shelf for everything literary. Keep track and plan ahead.";
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <h2 id="features-heading" className="font-medium text-gray-500">
            {getBookTitle()}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {shelfTitle}
          </p>
          <p className="mt-4 text-gray-500">{getBookDescription()}</p>
        </div>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">
          No books in this shelf yet.
        </p>
      ) : (
        <div className="mt-11 grid grid-cols-1 items-start gap-x-6 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col-reverse">
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    {book.title}
                  </h3>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex items-center rounded-full bg-gray-200 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-200">
                        <span className="sr-only">Change Shelf</span>
                        <span className="px-2 py-1">
                          <BsFillJournalBookmarkFill />
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  updateBookShelf(book, "currentlyReading")
                                }
                                className={`${
                                  book.shelf === "currentlyReading"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } block w-full text-left px-4 py-2 text-sm hover:bg-gray-200`}
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
                                className={`${
                                  book.shelf === "wantToRead"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } block w-full text-left px-4 py-2 text-sm hover:bg-gray-200`}
                              >
                                Want to Read
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => updateBookShelf(book, "read")}
                                className={`${
                                  book.shelf === "read"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } block w-full text-left px-4 py-2 text-sm hover:bg-gray-200`}
                              >
                                Read
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => updateBookShelf(book, "none")} 
                                className={`${
                                  book.shelf === "none"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } block w-full text-left px-4 py-2 text-sm hover:bg-gray-200`}
                              >
                                None
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {book.authors && book.authors.join(", ")}
                </p>
              </div>

              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <div
                  className="object-cover object-center overflow-hidden rounded-lg bg-gray-100"
                  style={{
                    backgroundImage: `url("${
                      book.imageLinks &&
                      book.imageLinks.thumbnail.replace("http://", "https://")
                    }")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;
