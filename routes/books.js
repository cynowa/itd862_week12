var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/book');

/* Get all book entries */
router.get('/', function(req, res, next) {
  Book.find(function (err, books) {
    if (err) return console.error(err);
    res.json(books);
  })
});

/* Create book entry */
router.post('/', function(req, res, next) {
  let bookToCreate = new Book(req.body);
  bookToCreate.save(function(err, book){
    res.send(book);
  });
});

/* Get specific book entry */
router.get('/:id', function(req, res, next) {
  Book.findOne({_id: req.params["id"]}, function(err, book) {
    if (err) return next(err);
    res.send(book);
  });
});

/* Update specific book entry */
router.put('/:id', function(req, res, next) {
  Book.findOneAndUpdate({_id: req.params["id"]}, req.body, function(err, book) {
    if (err) return next(err);
    res.status(204).send();
  });
});

/* Delete specific book entry */
router.delete('/:id', function(req, res, next) {
  Book.deleteOne({_id: req.params["id"]}, function(err, book) {
    if (err) return next(err);
    res.status(204).send();
  });
});

module.exports = router;
