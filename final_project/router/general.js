const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;

const public_users = express.Router();

// Task 6: Register a new user
public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.'
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: 'Username already exists.'
    });
  }

  users.push({ username, password });

  return res.status(201).json({
    message: 'User registered successfully.'
  });
});

// Task 1: Get all books
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Task 2: Get book by ISBN (project uses book keys 1–10)
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  return res.status(200).json(books[isbn]);
});

// Task 3: Get books by author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = {};

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author.toLowerCase().includes(author)) {
      result[isbn] = books[isbn];
    }
  });

  return res.status(200).json(result);
});

// Task 4: Get books by title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = {};

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title.toLowerCase().includes(title)) {
      result[isbn] = books[isbn];
    }
  });

  return res.status(200).json(result);
});

// Task 5: Get reviews for a book
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;