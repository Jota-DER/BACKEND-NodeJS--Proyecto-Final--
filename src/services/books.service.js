import { getAllBooks, getBookById, createBook } from "../models/books.model.js";

export const listBooks = async () => {
  return await getAllBooks();
};

export const findBook = async (id) => {
  return await getBookById(id);
};

export const addBook = async (data) => {
    return await createBook(data);
};
