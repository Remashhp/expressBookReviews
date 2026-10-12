
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 11: Retrieve all books
function getAllBooks() {
  return axios.get(`${BASE_URL}/`)
    .then(response => response.data);
}

// Retrieve a book by ISBN
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then(response => response.data);
}

// Retrieve books by author
function getBooksByAuthor(author) {
  return axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
    .then(response => response.data);
}

// Retrieve books by title
function getBooksByTitle(title) {
  return axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then(response => response.data);
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
