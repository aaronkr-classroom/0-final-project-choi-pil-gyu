// models/Book.js

const mongoose = require('mongoose');

// Book 스키마 정의
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

// Book 모델 생성
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

