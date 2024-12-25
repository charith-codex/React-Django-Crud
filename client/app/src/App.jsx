import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState(0);
  const [updateTitle, setUpdateTitle] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

    /****************** GET BOOK DETAILS ******************/
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  /****************** ADD BOOK ******************/
  const addBook = async () => {
    try {
      // everything inside object POST request
      const bookData = {
        title, // short version of title: title
        release_year: releaseYear, // cant doit here because in python I use release_year
      };
      const response = await fetch('http://127.0.0.1:8000/api/books/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

    /****************** UPDATE BOOK ******************/
  const updateTitleFunc = async (pk, release_year) => {
    try {
      const bookData = {
        title: updateTitle,
        release_year,
      };
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

    /****************** DELETE BOOK ******************/
  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: 'DELETE',
      });

      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Book Londer</h1>
        <div>
          <input
            type="text"
            placeholder="Book title.."
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Release year.."
            onChange={(e) => setReleaseYear(e.target.value)}
          />
          <button onClick={addBook}>Add Book</button>
        </div>
        {books.map((book) => (
          <div className="book-item" key={book.id}>
            <p>Title: {book.title}</p>
            <p>Release Year: {book.release_year}</p>
            <input
              type="text"
              placeholder="Update title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button onClick={() => updateTitleFunc(book.id, book.release_year)}>
              Update Title
            </button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;