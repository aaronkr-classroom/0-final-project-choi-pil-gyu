// controllers/BookController.js
"use strict";

const Book = require('../models/Book'); // Book 모델을 불러옵니다.

// 모든 책을 나열하는 함수
exports.index = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books); // JSON 형태로 책 목록 반환
  } catch (err) {
    next(err);
  }
};

// 책 생성 폼을 렌더링하는 함수
exports.new = (req, res) => {
  res.render('books/new'); // books/new.ejs 렌더링
};

// 새 책을 생성하는 함수
exports.create = async (req, res, next) => {
  try {
    const { title, description, maxStudents, cost } = req.body;
    const newBook = await Book.create({
      title,
      description,
      maxStudents,
      cost
    });
    res.status(201).json(newBook); // JSON 형태로 생성된 책 반환
  } catch (err) {
    next(err);
  }
};

// 특정 책의 세부 정보를 보여주는 함수
exports.show = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).send('Book not found');
      return;
    }
    res.json(book); // JSON 형태로 책의 세부 정보 반환
  } catch (err) {
    next(err);
  }
};

// 책 편집 폼을 렌더링하는 함수
exports.edit = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).send('Book not found');
      return;
    }
    res.render('books/edit', { book }); // books/edit.ejs 렌더링, book 데이터 전달
  } catch (err) {
    next(err);
  }
};

// 책 정보를 업데이트하는 함수
exports.update = async (req, res, next) => {
  try {
    const { title, description, maxStudents, cost } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
      title,
      description,
      maxStudents,
      cost
    }, { new: true }); // 업데이트된 책 데이터를 받아오기 위해 { new: true } 옵션 사용
    if (!updatedBook) {
      res.status(404).send('Book not found');
      return;
    }
    res.json(updatedBook); // JSON 형태로 업데이트된 책 반환
  } catch (err) {
    next(err);
  }
};

// 책 삭제 함수
exports.delete = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).send('Book not found');
      return;
    }
    res.json(deletedBook); // JSON 형태로 삭제된 책 반환
  } catch (err) {
    next(err);
  }
};

// 리다이렉트 뷰 함수
exports.redirectView = (req, res, next) => {
  const redirectPath = `/books/${res.locals.book._id}`;
  res.redirect(redirectPath);
};
