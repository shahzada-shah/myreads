import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BookAPI";

export default function Showcase() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        const urls = books
          .map((book) => book.imageLinks && book.imageLinks.thumbnail)
          .filter(Boolean);
        setImageUrls(urls);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderImages = (startIndex, endIndex) => {
    return imageUrls.slice(startIndex, endIndex).map((url, index) => (
      <div key={index} className="relative">
        <img
          src={url}
          alt=""
          className="aspect-[1/3] w-3/3 rounded-xl bg-slate-900/5 object-cover object-center shadow-lg mx-auto"
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
      </div>
    ));
  };

  return (
    <div className="bg-white">
      <main>
        <div className="relative isolate">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-slate-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-slate-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                    Manage Your Personal Book Collection
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-slate-600 sm:max-w-md lg:max-w-none">
                    With MyReads, you can easily categorize and track your
                    personal book collection. Sort by reading status, discover
                    new titles, and access your library from anywhere. It's the
                    smart, simple way to stay on top of your reading.
                  </p>
                  <div className="mt-6 flex items-center gap-x-6">
                    <Link
                      to="/library"
                      className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                    >
                      Visit Library
                    </Link>
                    <Link
                      to="/browse-catalog"
                      className="text-sm font-semibold leading-6 text-blue-800"
                    >
                      Explore Catalog <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    {renderImages(0, 1)}
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    {renderImages(1, 3)}
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    {renderImages(3, 5)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
