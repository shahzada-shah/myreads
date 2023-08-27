# My Bookshelf App

## Overview

This application serves as a virtual bookshelf, allowing users to search for books and manage their reading lists. Users can categorize books into different shelves like "Currently Reading," "Want to Read," and "Read."

## Tech Stack

- **Frontend**: ReactJS
- **State Management**: Context API
- **Build Tool**: Vite.js
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **API Calls**: Custom BooksAPI
- **Icons**: React Icons

### Special Note
While many React projects are bootstrapped with `create-react-app`, this one utilizes Vite.js for a faster and more optimized build. However, the familiar `npm start` command is still used for launching the app.

## Functionalities

1. **Search Books**: Users can search for books based on predefined terms.
2. **Manage Reading List**: Users can add books to different categories like "Currently Reading," "Want to Read," and "Read."
3. **Dynamic Updates**: The UI updates dynamically based on the user's actions without requiring a reload.
4. **Error Handling**: The app gracefully handles invalid queries and missing book data.
5. **Multi-word Search**: Users can search for books using multiple words, for example, "Artificial Intelligence."

## Installation & Running the App

Make sure you have Node.js and npm installed on your computer. If not, you can download and install them from the official [Node.js website](https://nodejs.org/en/download/).

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```

2. **Navigate to the project folder**

    ```bash
    cd your-repository-name
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Start the Application**

    ```bash
    npm start
    ```

After running the `npm start` command, your default web browser should open displaying the app. If it doesn't, navigate to `http://localhost:3000/` in your web browser.
