
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Retrieve all books from the API.
function getAllBooks() {
  return axios.get(`${BASE_URL}/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error retrieving all books:', error.message);
      throw error;
    });
}

// Retrieve a book using its ISBN.
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error retrieving book ${isbn}:`, error.message);
      throw error;
    });
}

// Retrieve books matching an author's name.
function getBooksByAuthor(author) {
  return axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error retrieving books by ${author}:`, error.message);
      throw error;
    });
}

// Retrieve books matching a title.
function getBooksByTitle(title) {
  return axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error retrieving books by title ${title}:`, error.message);
      throw error;
    });
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

