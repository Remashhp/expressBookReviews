const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');

const regd_users = express.Router();
let users = [];

const JWT_SECRET = 'access';

// Check whether username already exists
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Validate username and password
const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// Task 7: Login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.'
    });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({
      message: 'Invalid username or password.'
    });
  }

  const accessToken = jwt.sign({ username }, JWT_SECRET);

  req.session.username = username;
  req.session.token = accessToken;

  return res.status(200).json({
    message: 'Login successful.',
    token: accessToken
  });
});

// Task 8: Add or modify a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const username = req.session.username;
  const isbn = req.params.isbn;
  const review = req.query.review;

  if (!username) {
    return res.status(401).json({
      message: 'Please log in first.'
    });
  }

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  if (!review) {
    return res.status(400).json({
      message: 'Please provide a review.'
    });
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: 'Review added or updated successfully.',
    reviews: books[isbn].reviews
  });
});

// Task 9: Delete the current user's review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  const username = req.session.username;
  const isbn = req.params.isbn;

  if (!username) {
    return res.status(401).json({
      message: 'Please log in first.'
    });
  }

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  if (!Object.prototype.hasOwnProperty.call(books[isbn].reviews, username)) {
    return res.status(404).json({
      message: 'You have not reviewed this book.'
    });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: 'Review deleted successfully.',
    reviews: books[isbn].reviews
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;