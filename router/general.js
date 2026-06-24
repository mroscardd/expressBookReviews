const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password
  if (username && password) {
    response = users.some( user => user.username == username)
    if (!response) {
        users.push({"username": username,"password": password })
        return res.status(200).json({message: "User successfully register"})
    } else {
        return res.status(404).json({message: "User already registered"})
    }
  }

  return res.status(404).json({message: "error"})

});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
        const listBooks = await new Promise((resolve) => {
          resolve(books);
        });
    
        return res.status(200).json(listBooks);
      } catch (error) {
        return res.status(500).json({ message: "Error al obtener los libros", error: error.message });
      }
    });

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn
  try {
    const book = await new Promise((resolve) => {
        if (books[isbn]) {
            resolve(books[isbn]);
          } else {
            reject(new Error("Libro no encontrado"));
          }
    });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener libro", error: error.message });
  }
})
 
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
  
    try {
      const obtenerLibrosPorAutor = await new Promise((resolve, reject) => {
        const matches = [];
        const keys = Object.keys(books);
        
        keys.forEach(key => {
          if (books[key].author.toLowerCase() === author.toLowerCase()) {
            matches.push({ isbn: key, ...books[key] });
          }
        });
  
        if (matches.length > 0) {
          resolve(matches);
        } else {
          reject(new Error("No se encontraron libros para este autor"));
        }
      });
  
      return res.status(200).json(obtenerLibrosPorAutor);
  
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });


// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
  
    try {
      const obtenerLibrosPorTitulo = await new Promise((resolve, reject) => {
        const matches = [];
        const keys = Object.keys(books);
        
        keys.forEach(key => {
          if (books[key].title.toLowerCase() === title.toLowerCase()) {
            matches.push({ isbn: key, ...books[key] });
          }
        });
  
        if (matches.length > 0) {
          resolve(matches);
        } else {
          reject(new Error("No se encontraron libros para este título"));
        }
      });
  
      return res.status(200).json(obtenerLibrosPorTitulo);
  
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  })

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  const book = books[isbn]
  const review = book['reviews']
  return res.status(200).json(review)
});

module.exports.general = public_users;
