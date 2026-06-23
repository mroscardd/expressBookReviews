const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  const book = books[isbn]
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    const matches = []
    for (let i = 1; i <= 10; i++) {
        if (books[i]['author'] == author) {
            matches.push(books[i])
        }
    }
    return res.status(200).json(matches)
  
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    const matches = []
    for (let i = 1; i <= 10; i++) {
        if (books[i]['title'] == title) {
            matches.push(books[i])
        }
    }
    return res.status(200).json(matches)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
